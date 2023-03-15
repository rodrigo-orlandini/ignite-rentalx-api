import request from "supertest";
import { v4 as uuid } from 'uuid';
import { hash } from "bcrypt";

import { app } from "@shared/infra/http/app";
import { prisma } from "@shared/infra/prisma";

describe("Create category controller", () => {
    beforeEach(async () => {
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
    })

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions")
            .send({
                email: "admin@email.com",
                password: "admin"
            });

        const { refreshToken } = responseToken.body;

        const response = await request(app).post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest"
            })
            .set({
                Authorization: `Bearer ${refreshToken}`
            });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category with name exists", async () => {
        const responseToken = await request(app).post("/sessions")
            .send({
                email: "admin@email.com",
                password: "admin"
            });

        const { refreshToken } = responseToken.body;

        const response = await request(app).post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest"
            })
            .set({
                Authorization: `Bearer ${refreshToken}`
            });

        expect(response.status).toBe(400);
    });
});