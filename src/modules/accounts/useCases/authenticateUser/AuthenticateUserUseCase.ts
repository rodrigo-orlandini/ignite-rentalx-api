import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { AppError } from "@shared/errors/AppError";

import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
    refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, auth.SECRET_TOKEN, {
            subject: user.id,
            expiresIn: auth.EXPIRES_IN_TOKEN
        });

        const refreshTokenExpiresDate = this.dateProvider.addDays(15);

        const refreshToken = sign({ email }, auth.SECRET_REFRESH_TOKEN, {
            subject: user.id,
            expiresIn: auth.EXPIRES_IN_REFRESH_TOKEN
        });

        await this.usersTokensRepository.create({
            userId: user.id,
            refreshToken,
            expiresDate: refreshTokenExpiresDate
        });

        return {
            user: {
                name: user.name,
                email
            },
            token,
            refreshToken
        }
    }
}

export { AuthenticateUserUseCase };