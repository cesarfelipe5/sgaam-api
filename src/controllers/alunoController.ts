import { Request, Response } from "express";
import { alunoService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const alunoController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let alunos;
      let totalAlunos;

      const { nome } = req.query;
      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      if (nome) {
        const { rows, count } = await alunoService.searchAlunos({
          nome: nome as string,
          limit: perPage,
          offset,
        });

        alunos = rows;
        totalAlunos = count;
      } else {
        const { rows, count } = await alunoService.listAlunos({
          limit: perPage,
          offset,
        });

        alunos = rows;
        totalAlunos = count;
      }

      const totalPages = Math.ceil(totalAlunos / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Alunos listados com sucesso!",
        data: alunos,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalAlunos,
        },
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao listar alunos.",
        error,
      });
    }
  },

  byId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const aluno = await alunoService.findAlunoById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Aluno encontrado com sucesso!",
        data: aluno,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um buscar o aluno.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
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

      return sendResponse({
        res,
        status: 201,
        message: "Aluno criado com sucesso!",
        data: aluno,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação do aluno.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const aluno = await alunoService.updateAluno(Number(id), updatedData);

      return sendResponse({
        res,
        status: 200,
        message: "Aluno atualizado com sucesso!",
        data: aluno,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar aluno.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await alunoService.deleteAluno(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Aluno deletado com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao deletar aluno.",
        error,
      });
    }
  },
};
