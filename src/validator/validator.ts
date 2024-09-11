import { param } from "express-validator";
import { handleValidationErrors } from "../middlewares";

// Middleware para validar se o ID foi passado corretamente
export const validateId = [
  param("id")
    .notEmpty()
    .withMessage("ID é obrigatório")
    .isNumeric() // ou use .isUUID() caso seja um UUID
    .withMessage("ID inválido"),

  handleValidationErrors,
];
