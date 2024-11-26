import { body, param } from "express-validator";
import { Modalidade, Plano } from "../models";
import { createBaseService } from "../services";
import { handleValidationErrors } from "../utils/validationErrors";
import { existsValidator } from "../validator";

const planoService = createBaseService(Plano);
const modalidadeService = createBaseService(Modalidade);

export const planoMiddleware = {
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

    body("modalidadeIds")
      .notEmpty()
      .isArray({ min: 1 })
      .withMessage("É necessário a seleção de pelo menos uma modalidade")
      .custom(
        existsValidator({
          service: modalidadeService,
        })
      ),

    // body("inicioVigencia")
    //   .notEmpty()
    //   .withMessage("Início da vigência é obrigatório")
    //   .isISO8601()
    //   .withMessage(
    //     "Início da vigência deve estar em um formato de data válido (ISO8601)"
    //   ),

    // body("fimVigencia")
    //   .notEmpty()
    //   .withMessage("Fim da vigência é obrigatório")
    //   .isISO8601()
    //   .withMessage(
    //     "Fim da vigência deve estar em um formato de data válido (ISO8601)"
    //   ),

    body("precoPadrao")
      .notEmpty()
      .withMessage("Preço padrão é obrigatório")
      .isFloat({ gt: 0 })
      .withMessage("Preço padrão deve ser um valor numérico positivo")
      .isDecimal({ decimal_digits: "1,2" })
      .withMessage("Valor deve ser um número decimal com até 2 casas decimais"),

    body("duracao")
      .notEmpty()
      .withMessage("Duração é obrigatório")
      .isIn(["Anual", "Semestral", "Trimestral", "Mensal"])
      .withMessage(
        "Duração deve ser uma das seguintes opções: Anual, Semestral, Trimestral ou Mensal"
      ),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: planoService })),

    body("nome")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),

    body("descricao")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Descrição deve ter pelo menos 2 caracteres"),

    body("modalidades")
      .optional()
      .isArray({ min: 1 })
      .withMessage("É necessário a seleção de pelo menos uma modalidade")
      .custom(
        existsValidator({
          service: modalidadeService,
        })
      ),
    // body("inicioVigencia")
    //   .optional()
    //   .isDate()
    //   .withMessage("Início da vigência deve ser uma data válida"),

    // body("fimVigencia")
    //   .optional()
    //   .isDate()
    //   .withMessage("Fim da vigência deve ser uma data válida"),

    body("precoPadrao")
      .optional()
      .isFloat({ gt: 0 }) // Valida como número decimal (preço) e maior que zero
      .withMessage("Preço padrão deve ser um valor numérico positivo")
      .isDecimal({ decimal_digits: "1,2" })
      .withMessage("Valor deve ser um número decimal com até 2 casas decimais"),

    body("duracao")
      .optional()
      .isIn(["Anual", "Semestral", "Trimestral", "Mensal"])
      .withMessage(
        "Duração deve ser uma das seguintes opções: Anual, Semestral, Trimestral ou Mensal"
      ),

    handleValidationErrors,
  ],

  validateRemove: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: planoService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
};
