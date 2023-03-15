import { IUsersTokensRepository } from "../IUsersTokensRepository";
import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";

import { UsersTokens } from "@modules/accounts/entities/UsersTokens";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {

    private usersTokens: UsersTokens[] = [];
    
    async create({ expiresDate, refreshToken, userId }: ICreateUserTokenDTO): Promise<UsersTokens> {
        const userToken = new UsersTokens();

        Object.assign(userToken, {
            expiresDate,
            refreshToken,
            userId
        });

        this.usersTokens.push(userToken);

        return userToken;
    }
    
    async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UsersTokens> {
        const token = this.usersTokens.find(token => token.userId === userId && token.refreshToken === refreshToken);

        return token;
    }
    
    async deleteById(tokenId: string): Promise<void> {
        const userToken = this.usersTokens.find(token => token.id === tokenId);

        this.usersTokens.splice(
            this.usersTokens.indexOf(userToken)
        );
    }
    
    async findByRefreshToken(refreshToken: string): Promise<UsersTokens> {
        const token = this.usersTokens.find(token => token.refreshToken === refreshToken);

        return token;
    }
}

export { UsersTokensRepositoryInMemory };