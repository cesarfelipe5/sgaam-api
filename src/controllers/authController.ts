import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authService } from "../services";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;

    const user = await authService.createUser({ nome, email, senha });

    if (user.id) {
      return res
        .status(201)
        .json({ message: "Usuário registrado com sucesso!" });
    }

    return res
      .status(500)
      .json({ message: "Houve um problema na criação do usuário." });
  },

  login: async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    const user = await authService.findUserByUsername({ email });

    if (!user) {
      return res.status(401).json({ message: "Usuário ou senha inválido." });
    }

    const isValid = await bcrypt.compare(senha, user.senha);

    if (!isValid) {
      return res.status(401).json({ message: "Usuário ou senha inválido." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.email },
      process.env.JWT_SECRET!
      // { expiresIn: "1d" }
    );

    res.json({ token });
  },
};
