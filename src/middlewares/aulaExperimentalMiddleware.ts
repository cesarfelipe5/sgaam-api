import { body, param } from "express-validator";
import { AulaExperimental, Modalidade } from "../models";
import { createBaseService } from "../services";
import { handleValidationErrors } from "../utils/validationErrors";
import { existsValidator } from "../validator";

const modalidadeService = createBaseService(Modalidade);
const aulaExperimentalService = createBaseService(AulaExperimental);

export const aulaExperimentalMiddleware = {
  validateCreate: [
    body("nome")
      .notEmpty()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),

    body("cpf")
      .notEmpty()
      .withMessage("CPF é obrigatório")
      .isLength({ min: 11, max: 11 })
      .withMessage("CPF deve ter 11 dígitos")
      .matches(/^\d{11}$/)
      .withMessage("CPF deve conter apenas números"),

    body("date")
      .notEmpty()
      .withMessage("Data de vencimento é obrigatória")
      .isISO8601()
      .withMessage(
        "Data da aula experimental deve estar em um formato de data válido (ISO8601)"
      ),

    body("hour")
      .notEmpty()
      .withMessage("Hora é obrigatória")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("Hora deve estar no formato HH:mm e ser válida"),

    body("idModalidade")
      .notEmpty()
      .withMessage("Id da modalidade é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: modalidadeService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: aulaExperimentalService })),

    body("nome")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),

    body("cpf")
      .optional()
      .isLength({ min: 11, max: 11 })
      .withMessage("CPF deve ter 11 dígitos")
      .matches(/^\d{11}$/)
      .withMessage("CPF deve conter apenas números"),

    body("date")
      .optional()
      .isISO8601()
      .withMessage(
        "Data da aula experimental deve estar em um formato de data válido (ISO8601)"
      ),

    body("hour")
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("Hora deve estar no formato HH:mm e ser válida"),

    body("idModalidade")
      .optional()
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: modalidadeService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateRemove: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: aulaExperimentalService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
};
