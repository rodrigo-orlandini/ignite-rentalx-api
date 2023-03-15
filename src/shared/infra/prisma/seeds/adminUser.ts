import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";

import { prisma } from "..";

const adminSeedDatabase = async () => {
    const password = await hash("admin", 8);

    await prisma.users.create({
        data: {
            id: uuid(),
            name: "admin",
            email: "admin@email.com",
            password,
            isAdmin: true,
            driverLicense: "ABC-1234",
            createdAt: new Date()
        }
    });
}

adminSeedDatabase().then(() => console.log("Seed admin ran successfully!"));