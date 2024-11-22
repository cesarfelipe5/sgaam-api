import { Request, Response } from "express";
import { planoModalidadeService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const planoModalidadeController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let planoModalidade;
      let totalPlanoModalidade;

      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      const { rows, count } = await planoModalidadeService.listPlanosModalidade(
        {
          limit: perPage,
          offset,
        }
      );

      planoModalidade = rows;
      totalPlanoModalidade = count;

      const totalPages = Math.ceil(totalPlanoModalidade / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "PlanoModalidade listados com sucesso!",
        data: planoModalidade,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalPlanoModalidade,
        },
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao listar planoModalidade.",
        error,
      });
    }
  },

  byId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const planoModalidade =
        await planoModalidadeService.findPlanoModalidadeById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "PlanoModalidade encontrado com sucesso!",
        data: planoModalidade,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um erro buscar o planoModalidade.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { idModalidade, idPlano } = req.body;

      const planoModalidade =
        await planoModalidadeService.createPlanoModalidade({
          idModalidade,
          idPlano,
        });

      return sendResponse({
        res,
        status: 201,
        message: "PlanoModalidade criado com sucesso!",
        data: planoModalidade,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação do planoModalidade.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const planoModalidade =
        await planoModalidadeService.updatePlanoModalidade(
          Number(id),
          updatedData
        );

      return sendResponse({
        res,
        status: 200,
        message: "PlanoModalidade atualizado com sucesso!",
        data: planoModalidade,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar o planoModalidade.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await planoModalidadeService.deletePlanoModalidade(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "PlanoModalidade removido com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao remover o planoModalidade.",
        error,
      });
    }
  },
};
