import { Request, Response } from "express";
import { formaPagamentoService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const formaPagamentoController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let formaPagamentos;
      let totalFormaPagamento;

      const { nome } = req.query;
      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      if (nome) {
        const { rows, count } =
          await formaPagamentoService.searchFormaPagamento({
            nome: nome as string,
            limit: perPage,
            offset,
          });

        formaPagamentos = rows;
        totalFormaPagamento = count;
      } else {
        const { rows, count } = await formaPagamentoService.listFormaPagamentos(
          {
            limit: perPage,
            offset,
          }
        );

        formaPagamentos = rows;
        totalFormaPagamento = count;
      }

      const totalPages = Math.ceil(totalFormaPagamento / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Formas de pagamento listados com sucesso!",
        data: formaPagamentos,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalFormaPagamento,
        },
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao listar as forma de pagamento.",
        error,
      });
    }
  },

  byId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const formaPagamento = await formaPagamentoService.findFormaPagamentoById(
        Number(id)
      );

      return sendResponse({
        res,
        status: 200,
        message: "Forma de pagamento encontrado com sucesso!",
        data: formaPagamento,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um erro buscar a forma de pagamento.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { nome } = req.body;

      const formaPagamento = await formaPagamentoService.createFormaPagamento({
        nome,
      });

      return sendResponse({
        res,
        status: 201,
        message: "Forma de pagamento criado com sucesso!",
        data: formaPagamento,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação de forma de pagamento.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const formaPagamento = await formaPagamentoService.updateFormaPagamento(
        Number(id),
        updatedData
      );

      return sendResponse({
        res,
        status: 200,
        message: "Forma de pagamento atualizado com sucesso!",
        data: formaPagamento,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar a forma de pagamento.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await formaPagamentoService.deleteFormaPagamento(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Forma de pagamento removido com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao remover o forma de pagamento.",
        error,
      });
    }
  },
};
