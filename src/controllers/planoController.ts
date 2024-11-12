import { Request, Response } from "express";
import { planoService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const planoController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let planos;
      let totalPlanos;

      const { nome } = req.query;
      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      if (nome) {
        const { rows, count } = await planoService.searchPlano({
          nome: nome as string,
          limit: perPage,
          offset,
        });

        planos = rows;
        totalPlanos = count;
      } else {
        const { rows, count } = await planoService.listPlanos({
          limit: perPage,
          offset,
        });

        planos = rows;
        totalPlanos = count;
      }

      const totalPages = Math.ceil(totalPlanos / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Planos listados com sucesso!",
        data: planos,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalPlanos,
        },
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao listar planos.",
        error,
      });
    }
  },

  byId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const plano = await planoService.findPlanoById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Plano encontrado com sucesso!",
        data: plano,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um erro buscar o plano.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { nome, descricao, inicioVigencia, fimVigencia, precoPadrao } =
        req.body;

      const plano = await planoService.createPlano({
        nome,
        descricao,
        inicioVigencia,
        fimVigencia,
        precoPadrao,
      });

      return sendResponse({
        res,
        status: 201,
        message: "Plano criado com sucesso!",
        data: plano,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação do plano.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const aluno = await planoService.updatePlano(Number(id), updatedData);

      return sendResponse({
        res,
        status: 200,
        message: "Plano atualizado com sucesso!",
        data: aluno,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar o plano.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await planoService.deletePlano(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Plano removido com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao remover plano.",
        error,
      });
    }
  },
};
