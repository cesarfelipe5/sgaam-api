import { Router } from "express";
import { planoModalidadeController } from "../controllers";
import { planoModalidadeMiddleware } from "../middlewares";

const planoModalidadeRouter = Router();

planoModalidadeRouter.get("/", planoModalidadeController.listOrSearch);

planoModalidadeRouter.get("/:id", planoModalidadeController.byId);

planoModalidadeRouter.post(
  "/",
  planoModalidadeMiddleware.validateCreate,
  planoModalidadeController.create
);

planoModalidadeRouter.put(
  "/:id",
  planoModalidadeMiddleware.validateUpdate,
  planoModalidadeController.update
);

planoModalidadeRouter.delete(
  "/:id",
  planoModalidadeMiddleware.validateRemove,
  planoModalidadeController.remove
);

export { planoModalidadeRouter };
