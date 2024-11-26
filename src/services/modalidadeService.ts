import { Op } from "sequelize";
import {
  Modalidade,
  ModalidadeAttributes,
  ModalidadeCreationAttributes,
  Plano,
} from "../models";

interface SearchModalidade {
  nome: string;
  limit: number;
  offset: number;
  showAll: boolean;
}

export const modalidadeService = {
  /**
   * Encontra uma modalidade pelo ID
   * @param id - ID da modalidade
   */
  findModalidadeById: async (id: number) => {
    const modalidade = await Modalidade.findByPk(id, {
      include: [{ model: Plano, as: "planos" }],
    });

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
    showAll = false,
  }: {
    limit: number;
    offset: number;
    showAll: boolean;
  }) => {
    const whereClause = {
      where: !showAll ? { isActive: true } : undefined,
    };

    const modalidade = await Modalidade.findAndCountAll({
      ...whereClause,
      include: [{ model: Plano, as: "planos" }],
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

    await modalidade.update({ isActive: false });
  },

  /**
   * Busca por modalidade com base em critérios
   * @param nome - Nome parcial ou completo da modalidade
   */
  searchModalidade: async ({
    nome,
    limit,
    offset,
    showAll = false,
  }: SearchModalidade) => {
    const whereClause = {
      ...(showAll ? {} : { isActive: true }), // Se showAll for false, adiciona isActive: true
      nome: {
        [Op.like]: `%${nome}%`, // Condição para o nome
      },
    };

    const modalidade = await Modalidade.findAndCountAll({
      limit,
      offset,
      where: {
        ...whereClause,
      },
    });

    return modalidade;
  },
};
