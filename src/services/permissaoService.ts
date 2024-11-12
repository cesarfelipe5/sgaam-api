import { Op } from "sequelize";
import { Permissao, PermissaoCreationAttributes, Usuario } from "../models";

interface SearchPermissao {
  nome: string;
  limit: number;
  offset: number;
}

export const permissaoService = {
  /**
   * Encontra uma permissão pelo ID
   * @param id - ID da permissão
   */
  findPermissaoById: async (id: number) => {
    const permissao = await Permissao.findByPk(id, {
      include: [{ model: Usuario, as: "usuarios" }],
    });

    if (!permissao) {
      throw new Error("Permissão não encontrado");
    }

    return permissao;
  },

  /**
   * Lista as permissoes de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listPermissao: async ({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }) => {
    const permissao = await Permissao.findAndCountAll({
      include: [{ model: Usuario, as: "usuarios" }],
      limit,
      offset,
    });

    return permissao;
  },

  /**
   * Cria uma nova permissao
   * @param data - Dados da permissao a ser criado
   */
  createPermissao: async (
    data: PermissaoCreationAttributes
  ): Promise<Permissao> => {
    try {
      const permissao = await Permissao.create(data);

      return permissao;
    } catch (error) {
      console.error("Erro ao criar permissao:", error);
      throw error;
    }
  },

  /**
   * Atualiza uma permissao pelo ID
   * @param id - ID da permissao
   * @param data - Dados a serem atualizados
   */
  updatePermissao: async (
    id: number,
    data: Partial<PermissaoCreationAttributes>
  ) => {
    const permissao = await Permissao.findByPk(id);

    if (!permissao) {
      throw new Error("Permissão não encontrado");
    }

    await permissao.update(data);

    return permissao;
  },

  /**
   * Busca por permissao com base em critérios
   * @param id - Id da permissao a remover
   */
  deletePermissao: async (id: number): Promise<void> => {
    const permissao = await Permissao.findByPk(id);

    if (!permissao) {
      throw new Error("Permissão não encontrada");
    }

    await permissao.destroy();
  },

  /**
   * Busca por permissão com base em critérios
   * @param nome - Nome parcial ou completo do permissão
   */
  searchPermissao: async ({ nome, limit, offset }: SearchPermissao) => {
    const permissao = await Permissao.findAndCountAll({
      limit,
      offset,
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });

    return permissao;
  },
};
