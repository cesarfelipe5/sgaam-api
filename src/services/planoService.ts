import { Op } from "sequelize";
import { Aluno, Modalidade, Plano, PlanoCreationAttributes } from "../models";

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
  },

  /**
   * Lista os planos de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listPlanos: async ({ limit, offset }: { limit: number; offset: number }) => {
    const planos = await Plano.findAndCountAll({
      include: [
        { model: Aluno, as: "alunos" },
        { model: Modalidade, as: "modalidades" },
      ],
      limit,
      offset,
    });

    return planos;
  },

  /**
   * Cria um novo plano
   * @param data - Dados do plano a ser criado
   */
  createPlano: async (data: PlanoCreationAttributes): Promise<Plano> => {
    try {
      const plano = await Plano.create(data);

      return plano;
    } catch (error) {
      console.error("Erro ao criar plano:", error);
      throw error; // Ou faça o tratamento adequado do erro
    }
  },

  /**
   * Atualiza um plano pelo ID
   * @param id - ID do plano
   * @param data - Dados a serem atualizados
   */
  updatePlano: async (id: number, data: Partial<PlanoCreationAttributes>) => {
    const plano = await Plano.findByPk(id);

    if (!plano) {
      throw new Error("Plano não encontrado");
    }

    await plano.update(data);

    return plano;
  },

  /**
   * Busca por plano com base em critérios
   * @param id - Id do plano a remover
   */
  deletePlano: async (id: number): Promise<void> => {
    const plano = await Plano.findByPk(id);

    if (!plano) {
      throw new Error("Plano não encontrado");
    }

    await plano.destroy();
  },

  /**
   * Busca por plano com base em critérios
   * @param nome - Nome parcial ou completo do plano
   */
  searchPlano: async ({ nome, limit, offset }: SearchPlanos) => {
    const planos = await Plano.findAndCountAll({
      limit,
      offset,
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });

    return planos;
  },
};
