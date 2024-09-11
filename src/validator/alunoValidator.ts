import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares";

export const alunoValidator = {
  validateRegister: [
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
      .matches(/^\d{5}-\d{3}$/)
      .withMessage("CEP deve estar no formato 00000-000"),

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
      .matches(/^\d{5}-\d{3}$/)
      .withMessage("CEP deve estar no formato 00000-000"),

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
};
