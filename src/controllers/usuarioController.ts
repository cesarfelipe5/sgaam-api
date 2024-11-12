import { Request, Response } from "express";
import { usuarioService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const usuarioController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let usuarios;
      let totalUsuario;

      const { nome } = req.query;
      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      if (nome) {
        const { rows, count } = await usuarioService.searchUsuario({
          nome: nome as string,
          limit: perPage,
          offset,
        });

        usuarios = rows;
        totalUsuario = count;
      } else {
        const { rows, count } = await usuarioService.listUsuarios({
          limit: perPage,
          offset,
        });

        usuarios = rows;
        totalUsuario = count;
      }

      const totalPages = Math.ceil(totalUsuario / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Usuarios listados com sucesso!",
        data: usuarios,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalUsuario,
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

      const usuario = await usuarioService.findUsuarioById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Usuario encontrado com sucesso!",
        data: usuario,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um erro buscar o usuario.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { nome, email, senha } = req.body;

      const usuario = await usuarioService.createUsuario({
        nome,
        email,
        senha,
      });

      return sendResponse({
        res,
        status: 201,
        message: "Usuario criado com sucesso!",
        data: usuario,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação do usuario.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedData = req.body;

      const usuario = await usuarioService.updateUsuario(
        Number(id),
        updatedData
      );

      return sendResponse({
        res,
        status: 200,
        message: "Usuario atualizado com sucesso!",
        data: usuario,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar o usuario.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await usuarioService.deleteUsuario(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Usuario removido com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao remover o usuario.",
        error,
      });
    }
  },
};
