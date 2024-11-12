import { Router } from "express";
import { usuarioPermissaoController } from "../controllers";
import { usuarioMiddleware } from "../middlewares";

const usuarioPermissaoRouter = Router();

usuarioPermissaoRouter.get("/", usuarioPermissaoController.listOrSearch);

usuarioPermissaoRouter.get("/:id", usuarioPermissaoController.byId);

usuarioPermissaoRouter.post(
  "/",
  usuarioMiddleware.validateCreate,
  usuarioPermissaoController.create
);

usuarioPermissaoRouter.put(
  "/",
  usuarioMiddleware.validateUpdate,
  usuarioPermissaoController.update
);

usuarioPermissaoRouter.delete(
  "/:id",
  usuarioMiddleware.validateRemove,
  usuarioPermissaoController.remove
);

export { usuarioPermissaoRouter };
