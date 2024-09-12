import { Router } from "express";
import { alunoController } from "../controllers";
import { alunoValidator } from "../validator";

const alunoRouter = Router();

alunoRouter.get("/", alunoController.listOrSearch);

alunoRouter.get("/:id", alunoController.byId);

alunoRouter.post("/", alunoValidator.validateCreate, alunoController.create);

alunoRouter.put("/:id", alunoValidator.validateUpdate, alunoController.update);

alunoRouter.delete(
  "/:id",
  alunoValidator.validateRemove,
  alunoController.remove
);

export { alunoRouter };
