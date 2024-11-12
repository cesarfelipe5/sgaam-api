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

    body("valor")
      .notEmpty()
      .withMessage("Valor é obrigatório")
      .isFloat({ min: 0 })
      .withMessage("Valor deve ser um número positivo")
      .matches(/^\d+(\.\d{1,2})?$/)
      .withMessage("Valor deve ter no máximo 2 casas decimais"),

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
      .withMessage("Nome deve ter pelo menos 2 caracteres")
      .custom(uniqueValidator({ service: modalidadeService, field: "nome" })),

    body("descricao")
      .optional()
      .notEmpty()
      .withMessage("Descrição é obrigatório"),

    body("valor")
      .optional()
      .notEmpty()
      .withMessage("Valor é obrigatório")
      .isFloat({ min: 0 })
      .withMessage("Valor deve ser um número positivo")
      .matches(/^\d+(\.\d{1,2})?$/)
      .withMessage("Valor deve ter no máximo 2 casas decimais"),

    body("status")
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
