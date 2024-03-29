import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";
import { resolve } from 'path';

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("User does not exists.");
        }

        const token = uuid();
        const expiresDate = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refreshToken: token,
            userId: user.id,
            expiresDate
        });

        const templatePath = resolve(__dirname, "..", "..", 'views', "emails", "forgotPassword.hbs");
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}?token={token}`
        };

        await this.mailProvider.sendMail(email, "Recuperação de senha", variables, templatePath);
    }
}

export { SendForgotPasswordMailUseCase };