import { Op } from "sequelize";
import {
  Modalidade,
  ModalidadeAttributes,
  ModalidadeCreationAttributes,
} from "../models";

interface SearchModalidade {
  nome: string;
  limit: number;
  offset: number;
}

export const modalidadeService = {
  /**
   * Encontra uma modalidade pelo ID
   * @param id - ID da modalidade
   */
  findModalidadeById: async (id: number) => {
    const modalidade = await Modalidade.findByPk(id);

    if (!modalidade) {
      throw new Error("Modalidade não encontrada");
    }

    return modalidade;
  },

  /**
   * Lista as modalidade de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listModalidade: async ({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }) => {
    const modalidade = await Modalidade.findAndCountAll({
      limit,
      offset,
    });

    return modalidade;
  },

  /**
   * Cria uma nova modalidade
   * @param data - Dados da modalidade a ser criado
   */
  createModalidade: async (
    data: ModalidadeCreationAttributes
  ): Promise<Modalidade> => {
    try {
      const modalidade = await Modalidade.create(data);

      return modalidade;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Atualiza uma modalidade pelo ID
   * @param id - ID da modalidade
   * @param data - Dados a serem atualizados
   */
  updateModalidade: async (id: number, data: Partial<ModalidadeAttributes>) => {
    const modalidade = await Modalidade.findByPk(id);

    if (!modalidade) {
      throw new Error("Modalidade não encontrada");
    }

    await modalidade.update(data);

    return modalidade;
  },

  /**
   * Busca por uma modalidade com base em critérios
   * @param id - Id da modalidade a remover
   */
  deleteModalidade: async (id: number): Promise<void> => {
    const modalidade = await Modalidade.findByPk(id);

    if (!modalidade) {
      throw new Error("Modalidade não encontrada");
    }

    await modalidade.destroy();
  },

  /**
   * Busca por modalidade com base em critérios
   * @param nome - Nome parcial ou completo da modalidade
   */
  searchModalidade: async ({ nome, limit, offset }: SearchModalidade) => {
    const modalidade = await Modalidade.findAndCountAll({
      limit,
      offset,
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });

    return modalidade;
  },
};
