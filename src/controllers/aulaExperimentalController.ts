import { Request, Response } from "express";
import { aulaExperimentalService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const aulaExperimentalController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let aulaExperimentais;
      let totalAulaExperimentais;

      const { nome } = req.query;
      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      if (nome) {
        const { rows, count } =
          await aulaExperimentalService.searchAulaExperimental({
            nome: nome as string,
            limit: perPage,
            offset,
          });

        aulaExperimentais = rows;
        totalAulaExperimentais = count;
      } else {
        const { rows, count } =
          await aulaExperimentalService.listAulaExperimental({
            limit: perPage,
            offset,
          });

        aulaExperimentais = rows;
        totalAulaExperimentais = count;
      }

      const totalPages = Math.ceil(totalAulaExperimentais / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Aulas experimentais listadas com sucesso!",
        data: aulaExperimentais,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalAulaExperimentais,
        },
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao listar aulas experimentais.",
        error,
      });
    }
  },

  byId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const aulaExperimental =
        await aulaExperimentalService.findAulaExperimentalById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Aula experimental encontrado com sucesso!",
        data: aulaExperimental,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um erro buscar a aula experimental.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { nome, cpf, date, hour, idModalidade } = req.body;

      const aulaExperimental =
        await aulaExperimentalService.createAulaExperimental({
          nome,
          cpf,
          date,
          hour,
          idModalidade,
        });

      return sendResponse({
        res,
        status: 201,
        message: "Aula experimental criada com sucesso!",
        data: aulaExperimental,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação da aula experimental.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const aulaExperimental =
        await aulaExperimentalService.updateAulaExperimental(
          Number(id),
          updatedData
        );

      return sendResponse({
        res,
        status: 200,
        message: "Aula experimental atualizada com sucesso!",
        data: aulaExperimental,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar a aula experimental.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await aulaExperimentalService.deleteAulaExperimental(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Aula experimental removida com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao remover a aula experimental.",
        error,
      });
    }
  },
};
