import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Usuario } from "../models";
import { createBaseService } from "../services";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  const usuarioService = createBaseService(Usuario);

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    if (!(await usuarioService.findById(decoded.id))) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Armazena o `id` e qualquer outra informação no `req.user` para acesso em outros middlewares ou rotas
    (req as any).user = { id: decoded.id, username: decoded.username };

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
