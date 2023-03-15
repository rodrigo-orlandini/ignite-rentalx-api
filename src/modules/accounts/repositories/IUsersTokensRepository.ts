import { UsersTokens } from "../entities/UsersTokens";

import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUsersTokensRepository {
    create({ expiresDate, refreshToken, userId }: ICreateUserTokenDTO): Promise<UsersTokens>;
    findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UsersTokens>;
    deleteById(tokenId: string): Promise<void>;
    findByRefreshToken(refreshToken: string): Promise<UsersTokens>;
}   

export { IUsersTokensRepository };