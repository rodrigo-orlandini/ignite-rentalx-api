import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/MailProviderInMemory";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driverLicense: "111111",
            email: "email@email.com",
            name: "user",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("email@email.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send a forgot password mail if user not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("unknown@email.com")
        ).rejects.toEqual(new AppError("User does not exists."));
    });

    it("should be able to create an user token", async () => {
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

        await usersRepositoryInMemory.create({
            driverLicense: "222222",
            email: "address@email.com",
            name: "tokenuser",
            password: "1234"
        });        

        await sendForgotPasswordMailUseCase.execute("address@email.com");

        expect(generateTokenMail).toBeCalled();
    });
});