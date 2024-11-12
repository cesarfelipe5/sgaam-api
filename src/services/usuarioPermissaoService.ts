import { Op } from "sequelize";
import { Permissao, Usuario, UsuarioPermissao } from "../models";

interface SearchUsuarioPermissao {
  nome: string;
  limit: number;
  offset: number;
}

export const usuarioPermissaoService = {
  /**
   * Encontra um usuario prmissao pelo ID
   * @param id - ID do usuario
   */
  findUsuarioPermissaoById: async (id: number) => {
    const usuarioPermissao = await UsuarioPermissao.findByPk(id, {
      include: [
        { model: Permissao, as: "permissao" },
        { model: Usuario, as: "usuario" },
      ],
    });

    if (!usuarioPermissao) {
      throw new Error("Usuario permissao não encontrado");
    }

    return usuarioPermissao;
  },

  /**
   * Lista os usuarios de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listUsuarioPermissao: async ({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }) => {
    const usuarioPermissao = await Usuario.findAndCountAll({
      include: [
        { model: Permissao, as: "permissao" },
        { model: Usuario, as: "usuario" },
      ],
      limit,
      offset,
    });

    return usuarioPermissao;
  },

  /**
   * Cria um novo usuario
   * @param data - Dados do usuario a ser criado
   */
  createUsuarioPermissao: async ({
    idUsuario,
    permissions,
  }: {
    idUsuario: number;
    permissions: number[];
  }): Promise<UsuarioPermissao[]> => {
    try {
      const novasPermissoes = permissions.map((idPermissao) => ({
        idUsuario,
        idPermissao,
      }));

      await UsuarioPermissao.bulkCreate(novasPermissoes);

      // Retorna o usuário com as permissões atualizadas
      return await UsuarioPermissao.findAll({
        where: { idUsuario },
      });
    } catch (error) {
      console.error("Erro ao criar usuario permissao:", error);
      throw error; // Ou faça o tratamento adequado do erro
    }
  },

  /**
   * Atualiza um usuario pelo ID
   * @param id - ID do usuario
   * @param data - Dados a serem atualizados
   */
  updateUsuarioPermissao: async ({
    idUsuario,
    permissions,
  }: {
    idUsuario: number;
    permissions: number[];
  }) => {
    // Exclui permissões antigas e insere as novas, ou faça a lógica que melhor se adequar
    await UsuarioPermissao.destroy({ where: { idUsuario } });

    const novasPermissoes = permissions.map((idPermissao) => ({
      idUsuario,
      idPermissao,
    }));

    await UsuarioPermissao.bulkCreate(novasPermissoes);

    // Retorna o usuário com as permissões atualizadas
    return await UsuarioPermissao.findAll({ where: { idUsuario } });
  },

  /**
   * Busca por usuario com base em critérios
   * @param id - Id do usuario a remover
   */
  deleteUsuarioPermissao: async (id: number): Promise<void> => {
    const usuarioPermissao = await UsuarioPermissao.findByPk(id);

    if (!usuarioPermissao) {
      throw new Error("Usuario permissão não encontrado");
    }

    await usuarioPermissao.destroy();
  },

  /**
   * Busca por usuario com base em critérios
   * @param nome - Nome parcial ou completo do usuario
   */
  searchUsuarioPermissao: async ({
    nome,
    limit,
    offset,
  }: SearchUsuarioPermissao) => {
    const usuario = await Usuario.findAndCountAll({
      limit,
      offset,
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });

    return usuario;
  },
};
