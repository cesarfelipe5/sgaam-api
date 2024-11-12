import { Router } from "express";
import { pagamentoController } from "../controllers";
import { pagamentoMiddleware } from "../middlewares";

const pagamentoRouter = Router();

pagamentoRouter.get("/", pagamentoController.list);

pagamentoRouter.get("/:id", pagamentoController.byId);

pagamentoRouter.post(
  "/",
  pagamentoMiddleware.validateCreate,
  pagamentoController.create
);

pagamentoRouter.put(
  "/:id",
  pagamentoMiddleware.validateUpdate,
  pagamentoController.update
);

pagamentoRouter.delete(
  "/:id",
  pagamentoMiddleware.validateRemove,
  pagamentoController.remove
);

export { pagamentoRouter };
