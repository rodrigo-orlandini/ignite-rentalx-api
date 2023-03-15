import { inject, injectable } from "tsyringe";
import { verify, sign } from "jsonwebtoken";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import auth from "@config/auth";

import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<string> {
        const { email, sub: userId } = verify(token, auth.SECRET_REFRESH_TOKEN) as IPayload;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, token);

        if(!userToken) {
            throw new AppError("Refresh token doesn't exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refreshTokenExpiresDate = this.dateProvider.addDays(15);

        const refreshToken = sign({ email }, auth.SECRET_REFRESH_TOKEN, {
            subject: userId,
            expiresIn: auth.EXPIRES_IN_REFRESH_TOKEN
        });

        await this.usersTokensRepository.create({
            userId: userId,
            refreshToken,
            expiresDate: refreshTokenExpiresDate
        });

        return refreshToken
    }
}

export { RefreshTokenUseCase };