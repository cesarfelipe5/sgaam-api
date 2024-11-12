import { Router } from "express";
import { planoController } from "../controllers";
import { planoMiddleware } from "../middlewares";

const planoRouter = Router();

planoRouter.get("/", planoController.listOrSearch);

planoRouter.get("/:id", planoController.byId);

planoRouter.post("/", planoMiddleware.validateCreate, planoController.create);

planoRouter.put("/:id", planoMiddleware.validateUpdate, planoController.update);

planoRouter.delete(
  "/:id",
  planoMiddleware.validateRemove,
  planoController.remove
);

export { planoRouter };
