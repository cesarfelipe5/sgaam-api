import { Request, Response } from "express";
import { usuarioPermissaoService, usuarioService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const usuarioPermissaoController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let usuariosPermissao;
      let totalUsuarioPermissao;

      const { nome } = req.query;
      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      if (nome) {
        const { rows, count } =
          await usuarioPermissaoService.searchUsuarioPermissao({
            nome: nome as string,
            limit: perPage,
            offset,
          });

        usuariosPermissao = rows;
        totalUsuarioPermissao = count;
      } else {
        const { rows, count } = await usuarioService.listUsuarios({
          limit: perPage,
          offset,
        });

        usuariosPermissao = rows;
        totalUsuarioPermissao = count;
      }

      const totalPages = Math.ceil(totalUsuarioPermissao / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Usuario permissão listados com sucesso!",
        data: usuariosPermissao,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalUsuarioPermissao,
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

      const usuario = await usuarioPermissaoService.findUsuarioPermissaoById(
        Number(id)
      );

      return sendResponse({
        res,
        status: 200,
        message: "Usuario permissão encontrado com sucesso!",
        data: usuario,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um erro buscar o usuario permissão.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { idUsuario, permissions } = req.body;

      // Atualiza as permissões do usuário no serviço
      const usuario = await usuarioPermissaoService.createUsuarioPermissao({
        idUsuario,
        permissions,
      });

      return sendResponse({
        res,
        status: 201,
        message: "Usuario permissão criado com sucesso!",
        data: usuario,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação do usuario permissão.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { idUsuario, permissions } = req.body;

      // const updatedData = req.body;

      const usuario = await usuarioPermissaoService.updateUsuarioPermissao({
        idUsuario,
        permissions,
      });

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
