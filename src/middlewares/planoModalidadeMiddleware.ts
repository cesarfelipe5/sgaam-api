import { body, param } from "express-validator";
import { Modalidade, Plano, PlanoModalidade } from "../models";
import { createBaseService } from "../services";
import { handleValidationErrors } from "../utils/validationErrors";
import { existsValidator } from "../validator";

const planoModalidadeService = createBaseService(PlanoModalidade);
const planoService = createBaseService(Plano);
const modalidadeService = createBaseService(Modalidade);

// idModalidade, idPlano
export const planoModalidadeMiddleware = {
  validateCreate: [
    body("idPlano")
      .notEmpty()
      .withMessage("Id do plano é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: planoService })),

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
      .custom(existsValidator({ service: planoModalidadeService })),

    body("idPlano")
      .optional()
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: planoService })),

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
      .custom(existsValidator({ service: planoModalidadeService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
};
