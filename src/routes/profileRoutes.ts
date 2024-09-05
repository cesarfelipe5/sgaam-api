import { Router } from "express";
import { getProfile } from "../controllers/profileController";

const profileRouter = Router();

// Definir a rota para o perfil
profileRouter.get("/", getProfile);

export { profileRouter };
