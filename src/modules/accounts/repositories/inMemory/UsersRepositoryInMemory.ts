import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({ name, email, password, driverLicense }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            driverLicense
        });

        this.users.push(user);
    }

    async updateAvatar(id: string, avatarFile: string): Promise<void> {
        const userIndex = this.users.findIndex((user) => user.id = id);

        this.users[userIndex].avatar = avatarFile;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => user.email === email);

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find((user) => user.id === id);

        return user;
    }
}

export { UsersRepositoryInMemory };