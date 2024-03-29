import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(token);
    
        if(!userToken) {
            throw new AppError("Token invalid!");
        }

        const isDateExpired = this.dateProvider.compareIfBefore(userToken.expiresDate, this.dateProvider.dateNow());
        if(isDateExpired) {
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.userId);
        user.password = await hash(password, 8);

        await this.usersRepository.create(user);
        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUseCase };