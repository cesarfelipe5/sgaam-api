import { Op } from "sequelize";
import {
  AulaExperimental,
  AulaExperimentalAttributes,
  AulaExperimentalCreationAttributes,
  Modalidade,
} from "../models";

interface SearchAulaExperimental {
  nome: string;
  limit: number;
  offset: number;
}

export const aulaExperimentalService = {
  /**
   * Encontra um usuario pelo ID
   * @param id - ID do usuario
   */
  findAulaExperimentalById: async (id: number) => {
    const aulaExperimental = await AulaExperimental.findByPk(id, {
      include: [{ model: Modalidade, as: "modalidade" }],
    });

    if (!aulaExperimental) {
      throw new Error("Aula experimental não encontrado");
    }

    return aulaExperimental;
  },

  /**
   * Lista os usuarios de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listAulaExperimental: async ({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }) => {
    const aulaExperimentais = await AulaExperimental.findAndCountAll({
      include: [{ model: Modalidade, as: "modalidade" }],
      limit,
      offset,
    });

    return aulaExperimentais;
  },

  /**
   * Cria um novo usuario
   * @param data - Dados do usuario a ser criado
   */
  createAulaExperimental: async (
    data: AulaExperimentalCreationAttributes
  ): Promise<AulaExperimental> => {
    try {
      const aulaExperimental = await AulaExperimental.create(data);

      return aulaExperimental;
    } catch (error) {
      console.error("Erro ao criar aula experimental:", error);

      throw error;
    }
  },

  /**
   * Atualiza um usuario pelo ID
   * @param id - ID do usuario
   * @param data - Dados a serem atualizados
   */
  updateAulaExperimental: async (
    id: number,
    data: Partial<AulaExperimentalAttributes>
  ) => {
    const aulaExperimental = await AulaExperimental.findByPk(id);

    if (!aulaExperimental) {
      throw new Error("Aula experimental não encontrado");
    }

    await aulaExperimental.update(data);

    return aulaExperimental;
  },

  /**
   * Busca por usuario com base em critérios
   * @param id - Id do usuario a remover
   */
  deleteAulaExperimental: async (id: number): Promise<void> => {
    const aulaExperimental = await AulaExperimental.findByPk(id);

    if (!aulaExperimental) {
      throw new Error("Aula experimental não encontrado");
    }

    await aulaExperimental.destroy();
  },

  /**
   * Busca por usuario com base em critérios
   * @param nome - Nome parcial ou completo do usuario
   */
  searchAulaExperimental: async ({
    nome,
    limit,
    offset,
  }: SearchAulaExperimental) => {
    const aulaExperimental = await AulaExperimental.findAndCountAll({
      limit,
      offset,
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });

    return aulaExperimental;
  },
};
