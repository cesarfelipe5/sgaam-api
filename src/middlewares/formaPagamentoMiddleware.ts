import { body, param } from "express-validator";
import { FormaPagamento } from "../models";
import { createBaseService } from "../services";
import { handleValidationErrors } from "../utils/validationErrors";
import { existsValidator } from "../validator";

const formaPagamentoService = createBaseService(FormaPagamento);

export const formaPagamentoMiddleware = {
  validateCreate: [
    body("nome")
      .notEmpty()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: formaPagamentoService })),

    body("nome")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateRemove: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: formaPagamentoService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
};
