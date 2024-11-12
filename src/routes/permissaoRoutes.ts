import { Router } from "express";
import { permissaoController } from "../controllers";
import { permissaoMiddleware } from "../middlewares";

const permissaoRouter = Router();

permissaoRouter.get("/", permissaoController.listOrSearch);

permissaoRouter.get("/:id", permissaoController.byId);

permissaoRouter.post(
  "/",
  permissaoMiddleware.validateCreate,
  permissaoController.create
);

permissaoRouter.put(
  "/:id",
  permissaoMiddleware.validateUpdate,
  permissaoController.update
);

permissaoRouter.delete(
  "/:id",
  permissaoMiddleware.validateRemove,
  permissaoController.remove
);

export { permissaoRouter };
