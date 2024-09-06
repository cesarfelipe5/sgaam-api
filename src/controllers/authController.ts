import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userService } from "../services/userServices";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;

    await userService.createUser({ nome, email, senha });

    res.status(201).json({ message: "User registered successfully" });
  },

  login: async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    const user = await userService.findUserByUsername({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials 1" });
    }

    const isValid = await bcrypt.compare(senha, user.senha);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials 2" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ token });
  },
};
