import { Request, Response } from "express";
import { permissaoService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const permissaoController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let permissoes;
      let totalPermissoes;

      const { nome } = req.query;
      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      if (nome) {
        const { rows, count } = await permissaoService.searchPermissao({
          nome: nome as string,
          limit: perPage,
          offset,
        });

        permissoes = rows;
        totalPermissoes = count;
      } else {
        const { rows, count } = await permissaoService.listPermissao({
          limit: perPage,
          offset,
        });

        permissoes = rows;
        totalPermissoes = count;
      }

      const totalPages = Math.ceil(totalPermissoes / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Permissões listados com sucesso!",
        data: permissoes,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalPermissoes,
        },
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao listar permissões.",
        error,
      });
    }
  },

  byId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const permissao = await permissaoService.findPermissaoById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Permissao encontrada com sucesso!",
        data: permissao,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um erro buscar a permissao.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { nome, descricao } = req.body;

      const permissao = await permissaoService.createPermissao({
        nome,
        descricao,
      });

      return sendResponse({
        res,
        status: 201,
        message: "Permissao criada com sucesso!",
        data: permissao,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação da permissão.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const permissao = await permissaoService.updatePermissao(
        Number(id),
        updatedData
      );

      return sendResponse({
        res,
        status: 200,
        message: "Permissao atualizada com sucesso!",
        data: permissao,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar a permissão.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await permissaoService.deletePermissao(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Permissão removida com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao remover permissão.",
        error,
      });
    }
  },
};
