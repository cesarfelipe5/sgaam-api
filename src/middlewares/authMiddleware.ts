import { body } from "express-validator";
import { handleValidationErrors } from "../utils/validationErrors";

export const authMiddleware = {
  validateLogin: [
    body("email").isEmail().withMessage("E-mail must be a valid email"),
    body("senha").notEmpty().withMessage("Password is required"),

    handleValidationErrors,
  ],

  validateRegister: [
    body("email").isEmail().withMessage("E-mail must be a valid email"),
    body("nome").notEmpty().withMessage("Name is required"),
    body("senha").notEmpty().withMessage("Password is required"),

    handleValidationErrors,
  ],
};
