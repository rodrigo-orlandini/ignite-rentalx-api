import 'reflect-metadata';

import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider;

        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory, 
            usersTokensRepositoryInMemory, 
            dateProvider
        );
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driverLicense: "000123",
            email: "user@test.com",
            name: "User Test",
            password: "1234"
        };

        await createUserUseCase.execute(user);

        const response = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(response).toHaveProperty("token");
    });

    it("should not be able to authenticate a nonexistent user", async () => {
        await expect(authenticateUserUseCase.execute({
            email: "false@email.com",
            password: "false-password"
        })).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driverLicense: "000456",
            email: "user_unknown_pass@test.com",
            name: "User Unknown Pass Test",
            password: "5678"
        };

        await createUserUseCase.execute(user);

        await expect(authenticateUserUseCase.execute({
            email: "user_unknown_pass@test.com",
            password: "incorrect"
        })).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
});