import { body, param } from "express-validator";
import { handleValidationErrors } from "../middlewares";
import { Aluno } from "../models";
import { createBaseService } from "../services";
import { existsValidator, uniqueValidator } from "./validator";

const alunoService = createBaseService(Aluno);

export const alunoValidator = {
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
      .withMessage("CPF deve conter apenas números")
      .custom(uniqueValidator({ service: alunoService, field: "cpf" })),

    body("rg")
      .notEmpty()
      .withMessage("RG é obrigatório")
      .isLength({ min: 7 })
      .withMessage("RG deve ter pelo menos 7 caracteres"),

    body("uf")
      .notEmpty()
      .withMessage("UF é obrigatório")
      .isLength({ min: 2, max: 2 })
      .withMessage("UF deve conter 2 caracteres")
      .matches(/^[A-Z]{2}$/)
      .withMessage("UF deve ser em letras maiúsculas"),

    body("cidade")
      .notEmpty()
      .withMessage("Cidade é obrigatória")
      .isLength({ min: 2 })
      .withMessage("Cidade deve ter pelo menos 2 caracteres"),

    body("cep")
      .notEmpty()
      .withMessage("CEP é obrigatório")
      .matches(/^\d{8}$/)
      .withMessage("CEP deve conter apenas números"),

    body("numero")
      .notEmpty()
      .withMessage("Número é obrigatório")
      .isNumeric()
      .withMessage("Número deve ser um valor numérico"),

    body("bairro")
      .notEmpty()
      .withMessage("Bairro é obrigatório")
      .isLength({ min: 2 })
      .withMessage("Bairro deve ter pelo menos 2 caracteres"),

    body("logradouro")
      .notEmpty()
      .withMessage("Logradouro é obrigatório")
      .isLength({ min: 2 })
      .withMessage("Logradouro deve ter pelo menos 2 caracteres"),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: alunoService })),

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

    body("rg")
      .optional()
      .isLength({ min: 7 })
      .withMessage("RG deve ter pelo menos 7 caracteres"),

    body("uf")
      .optional()
      .isLength({ min: 2, max: 2 })
      .withMessage("UF deve conter 2 caracteres")
      .matches(/^[A-Z]{2}$/)
      .withMessage("UF deve ser em letras maiúsculas"),

    body("cidade")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Cidade deve ter pelo menos 2 caracteres"),

    body("cep")
      .optional()
      .matches(/^\d{8}$/)
      .withMessage("CEP deve conter apenas números"),

    body("numero")
      .optional()
      .isNumeric()
      .withMessage("Número deve ser um valor numérico"),

    body("bairro")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Bairro deve ter pelo menos 2 caracteres"),

    body("logradouro")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Logradouro deve ter pelo menos 2 caracteres"),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateRemove: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: alunoService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
};
