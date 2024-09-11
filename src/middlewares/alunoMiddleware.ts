import { NextFunction, Request, Response } from "express";
import { Aluno } from "../models";
import { sendResponse } from "../utils/responseHamdler";

export const alunoMiddleware = {
  checkAlunoExists: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return sendResponse({
          res,
          status: 404,
          message: "Aluno não encontrado",
        });
      }

      // Se o aluno for encontrado, adicione-o ao request para o próximo middleware
      req.aluno = aluno;

      next();
    } catch (error) {
      return sendResponse({
        res,
        status: 404,
        message: "Erro ao verificar o aluno",
        error,
      });
    }
  },
};
