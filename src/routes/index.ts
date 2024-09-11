import express from "express";
import { authenticateToken } from "../middlewares/authenticateMiddleware";
import { alunoRouter } from "./alunoRoutes";
import { authRouter } from "./authRoutes";
// import { profileRouter } from "./profileRoutes";

// Definir um roteador global para todas as rotas
const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

// Aplicar o middleware para todas as rotas a partir daqui
apiRouter.use(authenticateToken);

// Aqui estão as rotas que necessitam de autenticação
apiRouter.use("/aluno", alunoRouter);
// apiRouter.use("/profile", profileRouter);

export { apiRouter };
