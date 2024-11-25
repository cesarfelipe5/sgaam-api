import { body, param } from "express-validator";
import { Usuario } from "../models";
import { createBaseService } from "../services";
import { handleValidationErrors } from "../utils/validationErrors";
import { existsValidator, uniqueValidator } from "../validator";

const usuarioService = createBaseService(Usuario);

export const usuarioMiddleware = {
  validateCreate: [
    body("nome")
      .notEmpty()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),

    body("email")
      .notEmpty()
      .withMessage("E-mail é obrigatório")
      .isEmail()
      .withMessage("E-mail deve ser válido")
      .custom(uniqueValidator({ service: usuarioService, field: "email" })),

    body("senha")
      .notEmpty()
      .withMessage("Senha é obrigatória")
      .isLength({ min: 8 })
      .withMessage("Senha deve ter pelo menos 8 caracteres")
      .matches(/[A-Z]/)
      .withMessage("Senha deve conter pelo menos uma letra maiúscula")
      .matches(/[a-z]/)
      .withMessage("Senha deve conter pelo menos uma letra minúscula")
      .matches(/\d/)
      .withMessage("Senha deve conter pelo menos um número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Senha deve conter pelo menos um caractere especial"),
    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: usuarioService })),

    body("nome")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),

    body("email").optional().isEmail().withMessage("E-mail deve ser válido"),

    body("senha")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Senha deve ter pelo menos 8 caracteres")
      .matches(/[A-Z]/)
      .withMessage("Senha deve conter pelo menos uma letra maiúscula")
      .matches(/[a-z]/)
      .withMessage("Senha deve conter pelo menos uma letra minúscula")
      .matches(/\d/)
      .withMessage("Senha deve conter pelo menos um número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Senha deve conter pelo menos um caractere especial"),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],

  validateRemove: [
    param("id")
      .notEmpty()
      .withMessage("ID é obrigatório")
      .isNumeric() // ou use .isUUID() caso seja um UUID
      .withMessage("ID inválido")
      .custom(existsValidator({ service: usuarioService })),

    // Middleware de validação dos resultados
    handleValidationErrors,
  ],
};
