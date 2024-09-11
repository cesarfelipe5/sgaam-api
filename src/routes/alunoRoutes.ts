import { Router } from "express";
import { alunoController } from "../controllers";
import { alunoMiddleware } from "../middlewares";
import { alunoValidator } from "../validator";
import { validateId } from "../validator/validator";

const alunoRouter = Router();

alunoRouter.post(
  "/",
  alunoValidator.validateRegister,
  alunoController.register
);

alunoRouter.put(
  "/:id",
  validateId,
  alunoMiddleware.checkAlunoExists,
  alunoValidator.validateUpdate,
  alunoController.update
);

export { alunoRouter };
