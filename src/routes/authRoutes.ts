import { Router } from "express";
import { authController } from "../controllers/authController";
import { authMiddleware } from "../middlewares";

const authRouter = Router();

authRouter.post(
  "/register",
  authMiddleware.validateRegister,
  authController.register
);

authRouter.post("/login", authMiddleware.validateLogin, authController.login);

export { authRouter };
