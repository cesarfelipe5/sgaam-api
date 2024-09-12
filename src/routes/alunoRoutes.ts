import { Router } from "express";
import { alunoController } from "../controllers";
import { alunoMiddleware } from "../middlewares";

const alunoRouter = Router();

alunoRouter.get("/", alunoController.listOrSearch);

alunoRouter.get("/:id", alunoController.byId);

alunoRouter.post("/", alunoMiddleware.validateCreate, alunoController.create);

alunoRouter.put("/:id", alunoMiddleware.validateUpdate, alunoController.update);

alunoRouter.delete(
  "/:id",
  alunoMiddleware.validateRemove,
  alunoController.remove
);

export { alunoRouter };
