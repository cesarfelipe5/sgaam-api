import { Request, Response } from "express";
import { pagamentoService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const pagamentoController = {
  list: async (req: Request, res: Response) => {
    try {
      let pagamentos;
      let totalPagamento;

      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      const { rows, count } = await pagamentoService.listPagamentos({
        limit: perPage,
        offset,
      });

      pagamentos = rows;
      totalPagamento = count;

      const totalPages = Math.ceil(totalPagamento / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Usuarios listados com sucesso!",
        data: pagamentos,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalPagamento,
        },
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao listar usuarios.",
        error,
      });
    }
  },

  byId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const pagamento = await pagamentoService.findPagamentoById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Pagamento encontrado com sucesso!",
        data: pagamento,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um erro buscar o pagamento.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    const user = (req as any).user; // Pegando os dados do usuário armazenados no middleware

    try {
      const {
        dataPagamento,
        valor,
        observacao,
        dataVencimento,
        idPlanoAluno,
        idFormaPagamento,
      } = req.body;

      const pagamento = await pagamentoService.createPagamento({
        dataPagamento,
        valor,
        observacao,
        dataVencimento,
        pago: true,
        idUsuario: user.id,
        idPlanoAluno,
        idFormaPagamento,
      });

      return sendResponse({
        res,
        status: 201,
        message: "Pagamento criado com sucesso!",
        data: pagamento,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação do pagamento.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const pagamento = await pagamentoService.updatePagamento(
        Number(id),
        updatedData
      );

      return sendResponse({
        res,
        status: 200,
        message: "Pagamento atualizado com sucesso!",
        data: pagamento,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar o pagamento.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await pagamentoService.deletePagamento(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Pagamento removido com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao remover o pagamento.",
        error,
      });
    }
  },
};
