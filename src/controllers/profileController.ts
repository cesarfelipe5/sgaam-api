import { Request, Response } from "express";

export const getProfile = (req: Request, res: Response) => {
  console.log("reqreqreqreqreqreqreqreqreqreq", req);

  const user = (req as any).user; // Pegando os dados do usuário armazenados no middleware

  res.json({ message: `Welcome, ${user.username}!` });
};