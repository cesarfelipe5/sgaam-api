import { Router } from "express";
import { formaPagamentoController } from "../controllers";
import { formaPagamentoMiddleware } from "../middlewares";

const formaPagamentoRouter = Router();

formaPagamentoRouter.get("/", formaPagamentoController.listOrSearch);

formaPagamentoRouter.get("/:id", formaPagamentoController.byId);

formaPagamentoRouter.post(
  "/",
  formaPagamentoMiddleware.validateCreate,
  formaPagamentoController.create
);

formaPagamentoRouter.put(
  "/:id",
  formaPagamentoMiddleware.validateUpdate,
  formaPagamentoController.update
);

formaPagamentoRouter.delete(
  "/:id",
  formaPagamentoMiddleware.validateRemove,
  formaPagamentoController.remove
);

export { formaPagamentoRouter };
