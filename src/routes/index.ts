import express from "express";
import { authenticateToken } from "../middlewares/authenticateMiddleware";
import { alunoRouter } from "./alunoRoutes";
import { authRouter } from "./authRoutes";
import { formaPagamentoRouter } from "./formaPagamentoRoutes";
import { modalidadeRouter } from "./modalidadeRoutes";
import { pagamentoRouter } from "./pagamentoRoutes";
import { permissaoRouter } from "./permissaoRoutes";
import { planoRouter } from "./planoRoutes";
import { usuarioPermissaoRouter } from "./usuarioPermissaoRoutes";
import { usuarioRouter } from "./usuarioRoutes";
// import { profileRouter } from "./profileRoutes";

// Definir um roteador global para todas as rotas
const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

// Aplicar o middleware para todas as rotas a partir daqui
apiRouter.use(authenticateToken);

// Aqui estão as rotas que necessitam de autenticação
apiRouter.use("/aluno", alunoRouter);
apiRouter.use("/modalidade", modalidadeRouter);
apiRouter.use("/plano", planoRouter);
apiRouter.use("/permissao", permissaoRouter);
apiRouter.use("/usuario", usuarioRouter);
apiRouter.use("/formaPagamento", formaPagamentoRouter);
apiRouter.use("/pagamento", pagamentoRouter);
apiRouter.use("/usuarioPermissao", usuarioPermissaoRouter);
// apiRouter.use("/profile", profileRouter);

export { apiRouter };
