import { Request, Response } from "express";
import { modalidadeService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const modalidadeController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let modalidades;
      let totalModalidades;

      const { nome } = req.query;
      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      if (nome) {
        const { rows, count } = await modalidadeService.searchModalidade({
          nome: nome as string,
          limit: perPage,
          offset,
        });

        modalidades = rows;
        totalModalidades = count;
      } else {
        const { rows, count } = await modalidadeService.listModalidade({
          limit: perPage,
          offset,
        });

        modalidades = rows;
        totalModalidades = count;
      }

      const totalPages = Math.ceil(totalModalidades / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Modalidades listadas com sucesso!",
        data: modalidades,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalModalidades,
        },
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao listar as modalidades.",
        error,
      });
    }
  },

  byId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const modalidade = await modalidadeService.findModalidadeById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Modalidade encontrado com sucesso!",
        data: modalidade,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um buscar a modalidade.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { nome, descricao, status, valor } = req.body;

      const modalidade = await modalidadeService.createModalidade({
        nome,
        descricao,
        status,
        valor,
      });

      return sendResponse({
        res,
        status: 201,
        message: "Modalidade criada com sucesso!",
        data: modalidade,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação da modalidade.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const modalidade = await modalidadeService.updateModalidade(
        Number(id),
        updatedData
      );

      return sendResponse({
        res,
        status: 200,
        message: "Modalidade atualizada com sucesso!",
        data: modalidade,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar a modalidade.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await modalidadeService.deleteModalidade(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Modalidade deletada com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao deletar modalidade.",
        error,
      });
    }
  },
};
