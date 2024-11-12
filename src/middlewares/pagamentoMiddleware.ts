import { body, param } from "express-validator";
import { FormaPagamento, Pagamento, Usuario } from "../models";
import { createBaseService } from "../services";
import { handleValidationErrors } from "../utils/validationErrors";
import { existsValidator } from "../validator";

const pagamentoService = createBaseService(Pagamento);
const formaPagamentoService = createBaseService(FormaPagamento);
const usuarioService = createBaseService(Usuario);

export const pagamentoMiddleware = {
  validateCreate: [
    body("dataPagamento")
      .notEmpty()
      .withMessage("Data de pagamento é obrigatória")
      .isISO8601()
      .withMessage(
        "Data de pagamento deve estar em um formato de data válido (ISO8601)"
      ),

    body("valor")
      .notEmpty()
      .withMessage("Valor é obrigatório")
      .isDecimal({ decimal_digits: "1,2" })
      .withMessage("Valor deve ser um número decimal com até 2 casas decimais"),

    body("observacao")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Observação deve ter pelo menos 10 caractere"),

    body("dataVencimento")
      .notEmpty()
      .withMessage("Data de vencimento é obrigatória")
      .isISO8601()
      .withMessage(
        "Data de vencimento deve estar em um formato de data válido (ISO8601)"
      ),

    body("idUsuario")
      .notEmpty()
      .withMessage("ID do usuário é obrigatório")
      .custom(existsValidator({ service: usuarioService })),

    // TODO REVER
    // body("idPlanoAluno")
    //   .notEmpty()
    //   .withMessage("ID do plano do aluno é obrigatório")
    //   .custom(existsValidator({ service: usuarioService })),

    body("idFormaPagamento")
      .notEmpty()
      .withMessage("ID da forma de pagamento é obrigatório")
      .custom(existsValidator({ service: formaPagamentoService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateUpdate: [
    param("id")
      .optional()
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: pagamentoService })),

    body("dataPagamento")
      .optional()
      .isISO8601()
      .withMessage(
        "Data de pagamento deve estar em um formato de data válido (ISO8601)"
      ),

    body("valor")
      .optional()
      .isDecimal({ decimal_digits: "1,2" })
      .withMessage("Valor deve ser um número decimal com até 2 casas decimais"),

    body("observacao")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Observação deve ter pelo menos 10 caractere"),

    body("dataVencimento")
      .optional()
      .isISO8601()
      .withMessage(
        "Data de vencimento deve estar em um formato de data válido (ISO8601)"
      ),

    body("idUsuario")
      .optional()
      .custom(existsValidator({ service: usuarioService })),

    // TODO REVER
    // body("idPlanoAluno")
    //   .notEmpty()
    //   .withMessage("ID do plano do aluno é obrigatório")
    //   .custom(existsValidator({ service: usuarioService })),

    body("idFormaPagamento")
      .optional()
      .custom(existsValidator({ service: formaPagamentoService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateRemove: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: pagamentoService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
};
