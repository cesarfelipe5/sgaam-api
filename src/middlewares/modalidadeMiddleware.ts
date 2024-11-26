import { body, param } from "express-validator";
import { Modalidade } from "../models";
import { createBaseService } from "../services";
import { handleValidationErrors } from "../utils/validationErrors";
import { existsValidator, uniqueValidator } from "../validator";

const modalidadeService = createBaseService(Modalidade);

export const modalidadeMiddleware = {
  validateCreate: [
    body("nome")
      .notEmpty()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres")
      .custom(uniqueValidator({ service: modalidadeService, field: "nome" })),

    body("descricao").notEmpty().withMessage("Descrição é obrigatório"),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: modalidadeService })),

    body("nome")
      .optional()
      .notEmpty()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),
    // .custom(uniqueValidator({ service: modalidadeService, field: "nome" })),

    body("descricao")
      .optional()
      .notEmpty()
      .withMessage("Descrição é obrigatório"),

    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("Campo deve ser um boolen"),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateRemove: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: modalidadeService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
};
