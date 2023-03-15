import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokens } from "@modules/accounts/entities/UsersTokens";

import { prisma } from "@shared/infra/prisma";

class UsersTokensRepository implements IUsersTokensRepository {
    async create({ expiresDate, refreshToken, userId }: ICreateUserTokenDTO): Promise<UsersTokens> {
        const usersTokens = new UsersTokens();

        Object.assign(usersTokens, {
            expiresDate,
            refreshToken,
            userId
        });

        await prisma.usersTokens.create({
            data: usersTokens
        });

        return usersTokens
    }

    async findByUserIdAndRefreshToken(userId: string,  refreshToken: string): Promise<UsersTokens> {
        const userTokens = await prisma.usersTokens.findUnique({
            where: { 
                userId,
                refreshToken
            }
        });

        return userTokens;
    }

    async deleteById(tokenId: string): Promise<void> {
        await prisma.usersTokens.delete({
            where: { id: tokenId }
        });
    }

    async findByRefreshToken(refreshToken: string): Promise<UsersTokens> {
        const userToken = await prisma.usersTokens.findUnique({
            where: { refreshToken }
        });

        return userToken;
    }
}

export { UsersTokensRepository };