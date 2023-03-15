import { prisma } from "../../../../../shared/infra/prisma";

import { User } from "@modules/accounts/entities/User";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {    
    async create({ id, name, password, email, driverLicense, avatar }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            id,
            name,
            password,
            email,
            driverLicense,
            avatar
        });

        await prisma.users.create({
            data: user
        });
    }

    async updateAvatar(id: string, avatarFile: string): Promise<void> {
        await prisma.users.update({
            where: { id },
            data: {
                avatar: avatarFile
            }
        });
    }

    async findByEmail(email: string): Promise<User> {
        const user = await prisma.users.findUnique({
            where: { email }
        });

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await prisma.users.findUnique({
            where: { id }
        });

        return user;
    }
}

export { UsersRepository };