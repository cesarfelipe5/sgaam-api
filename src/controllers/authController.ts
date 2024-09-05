import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userService } from "../services/userServices";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    await userService.createUser({ username, password });

    res.status(201).json({ message: "User registered successfully" });
  },

  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await userService.findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ token });
  },
};
