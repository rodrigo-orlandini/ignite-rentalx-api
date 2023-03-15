import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

authenticateRoutes.post("/refresh-token", ensureAuthenticated, refreshTokenController.handle);

authenticateRoutes.post('/forgot-password', ensureAuthenticated, sendForgotPasswordMailController.handle);

authenticateRoutes.post('/reset-password', ensureAuthenticated, resetPasswordController.handle);

export { authenticateRoutes };