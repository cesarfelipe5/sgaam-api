import { Router } from "express";
import { usuarioController } from "../controllers";
import { usuarioMiddleware } from "../middlewares";

const usuarioRouter = Router();

usuarioRouter.get("/", usuarioController.listOrSearch);

usuarioRouter.get("/:id", usuarioController.byId);

usuarioRouter.post(
  "/",
  usuarioMiddleware.validateCreate,
  usuarioController.create
);

usuarioRouter.put(
  "/:id",
  usuarioMiddleware.validateUpdate,
  usuarioController.update
);

usuarioRouter.delete(
  "/:id",
  usuarioMiddleware.validateRemove,
  usuarioController.remove
);

export { usuarioRouter };
