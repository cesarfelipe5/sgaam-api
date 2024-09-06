import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const authValidator = {
  validateLogin: [
    body("email").isEmail().withMessage("E-mail must be a valid email"),
    body("senha").notEmpty().withMessage("Password is required"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
  ],
  validateRegister: [
    body("email").isEmail().withMessage("E-mail must be a valid email"),
    body("nome").notEmpty().withMessage("Name is required"),
    body("senha").notEmpty().withMessage("Password is required"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
  ],
};
