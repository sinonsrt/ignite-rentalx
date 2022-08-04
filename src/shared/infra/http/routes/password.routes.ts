import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailUseCase = new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", sendForgotPasswordMailUseCase.handle);

export { passwordRoutes };
