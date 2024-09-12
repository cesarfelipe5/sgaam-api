import { Router } from "express";
import { modalidadeController } from "../controllers";
import { modalidadeMiddleware } from "../middlewares";

const modalidadeRouter = Router();

modalidadeRouter.get("/", modalidadeController.listOrSearch);

modalidadeRouter.get("/:id", modalidadeController.byId);

modalidadeRouter.post(
  "/",
  modalidadeMiddleware.validateCreate,
  modalidadeController.create
);

modalidadeRouter.put(
  "/:id",
  modalidadeMiddleware.validateUpdate,
  modalidadeController.update
);

modalidadeRouter.delete(
  "/:id",
  modalidadeMiddleware.validateRemove,
  modalidadeController.remove
);

export { modalidadeRouter };
