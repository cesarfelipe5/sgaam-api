import { body, param } from "express-validator";
import { Permissao } from "../models";
import { createBaseService } from "../services";
import { handleValidationErrors } from "../utils/validationErrors";
import { existsValidator } from "../validator";

const permissaoService = createBaseService(Permissao);

export const permissaoMiddleware = {
  validateCreate: [
    body("nome")
      .notEmpty()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),

    body("descricao")
      .notEmpty()
      .withMessage("Descrição é obrigatório")
      .isLength({ min: 2 })
      .withMessage("Descrição deve ter pelo menos 2 caracteres"),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: permissaoService })),

    body("nome")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),

    body("descricao")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Descrição deve ter pelo menos 2 caracteres"),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateRemove: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: permissaoService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
};
