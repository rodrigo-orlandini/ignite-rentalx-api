import { v4 as uuid } from "uuid";

class UsersTokens {
    id?: string;
    refreshToken: string;
    expiresDate: Date;
    createdAt: Date;
    userId: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
            this.createdAt = new Date();
        }
    }
}

export { UsersTokens };