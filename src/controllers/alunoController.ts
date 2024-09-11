import { Request, Response } from "express";
import { alunoService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const alunoController = {
  register: async (req: Request, res: Response) => {
    try {
      const { nome, cpf, rg, uf, cidade, cep, numero, bairro, logradouro } =
        req.body;

      const aluno = await alunoService.createAluno({
        nome,
        cpf,
        rg,
        uf,
        cidade,
        cep,
        numero,
        bairro,
        logradouro,
      });

      if (aluno.id) {
        return sendResponse({
          res,
          status: 201,
          message: "Aluno criado com sucesso!",
          data: aluno,
        });
      }

      return sendResponse({
        res,
        status: 500,
        message: "Houve um problema na criação do aluno.",
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        status: 500,
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { aluno } = req;

      console.log("alunoalunoaluno", aluno);
    } catch (error) {}
  },
};
