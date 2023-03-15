import { v4 as uuid } from "uuid";

class User {
    id?: string;
    name: string;
    password: string;
    email: string;
    driverLicense: string;
    avatar?: string;
    isAdmin: boolean;
    createdAt: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
            this.isAdmin = false;
            this.createdAt = new Date();
        }
    }
}

export { User };