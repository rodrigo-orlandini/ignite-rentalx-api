import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersTokensRepository } from "@modules/accounts/infra/prisma/repositories/UsersTokensRepository";

import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";

interface IJWTPayload {
    sub: string;
}

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const authHeader = request.headers.authorization;
    const usersTokensRepository = new UsersTokensRepository();

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(token, auth.SECRET_REFRESH_TOKEN) as IJWTPayload;

        const user = await usersTokensRepository.findByUserIdAndRefreshToken(userId, token);
        if(!user) {
            throw new AppError("User doesn't exists.", 401);
        }

        request.user = {
            id: userId
        }

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}