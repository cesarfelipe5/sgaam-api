import {
  Modalidade,
  Plano,
  PlanoModalidade,
  PlanoModalidadeCreationAttributes,
} from "../models";

export const planoModalidadeService = {
  /**
   * Encontra um usuario pelo ID
   * @param id - ID do usuario
   */
  findPlanoModalidadeById: async (id: number) => {
    const planoModalidade = await PlanoModalidade.findByPk(id, {
      include: [
        { model: Plano, as: "planos" },
        { model: Modalidade, as: "modalidades" },
      ],
    });

    if (!planoModalidade) {
      throw new Error("PlanoModalidade não encontrado");
    }

    return planoModalidade;
  },

  /**
   * Lista os usuarios de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listPlanosModalidade: async ({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }) => {
    const planoModalidades = await PlanoModalidade.findAndCountAll({
      include: [
        { model: Plano, as: "planos" },
        { model: Modalidade, as: "modalidades" },
      ],
      limit,
      offset,
    });

    return planoModalidades;
  },

  /**
   * Cria um novo usuario
   * @param data - Dados do usuario a ser criado
   */
  createPlanoModalidade: async (
    data: PlanoModalidadeCreationAttributes
  ): Promise<PlanoModalidade> => {
    try {
      const planoModalidade = await PlanoModalidade.create(data);

      return planoModalidade;
    } catch (error) {
      console.error("Erro ao criar um planoModalidade:", error);
      throw error; // Ou faça o tratamento adequado do erro
    }
  },

  /**
   * Atualiza um usuario pelo ID
   * @param id - ID do usuario
   * @param data - Dados a serem atualizados
   */
  updatePlanoModalidade: async (
    id: number,
    data: Partial<PlanoModalidadeCreationAttributes>
  ) => {
    const planoModalidade = await PlanoModalidade.findByPk(id);

    if (!planoModalidade) {
      throw new Error("PlanoModalidade não encontrado");
    }

    await planoModalidade.update(data);

    return planoModalidade;
  },

  /**
   * Busca por usuario com base em critérios
   * @param id - Id do usuario a remover
   */
  deletePlanoModalidade: async (id: number): Promise<void> => {
    const planoModalidade = await PlanoModalidade.findByPk(id);

    if (!planoModalidade) {
      throw new Error("PlanoModalidade não encontrado");
    }

    await planoModalidade.destroy();
  },
};
