import { Op } from "sequelize";
import {
  Aluno,
  Modalidade,
  Plano,
  PlanoCreationAttributes,
  PlanoModalidade,
} from "../models";

interface SearchPlanos {
  nome: string;
  limit: number;
  offset: number;
}

export const planoService = {
  /**
   * Encontra um plano pelo ID
   * @param id - ID do plano
   */
  findPlanoById: async (id: number) => {
    try {
      const plano = await Plano.findByPk(id, {
        include: [
          { model: Aluno, as: "alunos" },
          { model: Modalidade, as: "modalidades" },
        ],
      });

      if (!plano) {
        throw new Error("Plano não encontrado");
      }

      return plano;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Lista os planos de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listPlanos: async ({ limit, offset }: { limit: number; offset: number }) => {
    try {
      const planos = await Plano.findAndCountAll({
        where: {
          isActive: true,
        },
        include: [
          { model: Aluno, as: "alunos" },
          { model: Modalidade, as: "modalidades" },
        ],
        limit,
        offset,
      });

      return planos;
    } catch (error) {
      throw error;
    }
  },

  createPlano: async (
    planoData: PlanoCreationAttributes,
    modalidadeIds: number[]
  ) => {
    try {
      // Cria o plano
      const plano = await Plano.create(planoData);

      // Verifica se as modalidades existem
      const modalidades = await Modalidade.findAll({
        where: { id: modalidadeIds },
      });

      if (modalidades.length !== modalidadeIds.length) {
        throw new Error(
          "Uma ou mais modalidades não existem. Verifique os IDs fornecidos."
        );
      }

      // Cria as associações no modelo intermediário
      const planoModalidades = modalidadeIds.map((idModalidade) => ({
        idPlano: plano.id,
        idModalidade,
      }));

      await PlanoModalidade.bulkCreate(planoModalidades);

      return plano;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Atualiza um plano pelo ID
   * @param id - ID do plano
   * @param data - Dados a serem atualizados
   */
  updatePlano: async (id: number, data: Partial<PlanoCreationAttributes>) => {
    try {
      const plano = await Plano.findByPk(id);

      if (!plano) {
        throw new Error("Plano não encontrado");
      }

      await plano.update(data);

      return plano;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Busca por plano com base em critérios
   * @param id - Id do plano a remover
   */
  deletePlano: async (id: number): Promise<void> => {
    try {
      const plano = await Plano.findByPk(id);

      if (!plano) {
        throw new Error("Plano não encontrado");
      }

      await plano.update({ isActive: false });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Busca por plano com base em critérios
   * @param nome - Nome parcial ou completo do plano
   */
  searchPlano: async ({ nome, limit, offset }: SearchPlanos) => {
    try {
      const planos = await Plano.findAndCountAll({
        limit,
        offset,
        where: {
          isActive: true,
          nome: {
            [Op.like]: `%${nome}%`,
          },
        },
      });

      return planos;
    } catch (error) {
      throw error;
    }
  },
};
