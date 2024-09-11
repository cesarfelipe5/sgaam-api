import { Router } from "express";
import { authController } from "../controllers/authController";
import { authValidator } from "../validator";

const authRouter = Router();

authRouter.post(
  "/register",
  authValidator.validateRegister,
  authController.register
);

authRouter.post("/login", authValidator.validateLogin, authController.login);

export { authRouter };
