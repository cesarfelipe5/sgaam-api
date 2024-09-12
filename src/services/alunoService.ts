import { Op } from "sequelize";
import { Aluno, AlunoCreationAttributes } from "../models";

interface SearchAlunos {
  nome: string;
  limit: number;
  offset: number;
}

export const alunoService = {
  /**
   * Encontra um aluno pelo ID
   * @param id - ID do aluno
   */
  findAlunoById: async (id: number) => {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    return aluno;
  },

  /**
   * Cria um novo aluno
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listAlunos: async ({ limit, offset }: { limit: number; offset: number }) => {
    const alunos = await Aluno.findAndCountAll({
      limit,
      offset,
    });

    return alunos;
  },

  /**
   * Cria um novo aluno
   * @param data - Dados do aluno a ser criado
   */
  // createAluno: async (data: AlunoCreationAttributes): Promise<Aluno> => {
  //   const aluno = await Aluno.create(data, { logging: console.log });

  //   return aluno;
  // },

  createAluno: async (data: AlunoCreationAttributes): Promise<Aluno> => {
    try {
      const aluno = await Aluno.create(data, { logging: console.log });
      return aluno;
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      throw error; // Ou faça o tratamento adequado do erro
    }
  },

  /**
   * Remove um aluno pelo ID
   * @param id - ID do aluno a ser removido
   */
  removeAlunoById: async (id: number) => {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    await aluno.destroy();

    return { message: "Aluno removido com sucesso" };
  },

  /**
   * Atualiza um aluno pelo ID
   * @param id - ID do aluno
   * @param data - Dados a serem atualizados
   */
  updateAluno: async (id: number, data: Partial<AlunoCreationAttributes>) => {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    await aluno.update(data);

    return aluno;
  },

  /**
   * Busca por alunos com base em critérios
   * @param id - Id do alun a remover
   */
  deleteAluno: async (id: number): Promise<void> => {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    await aluno.destroy();
  },

  /**
   * Busca por alunos com base em critérios
   * @param nome - Nome parcial ou completo do aluno
   */
  searchAlunos: async ({ nome, limit, offset }: SearchAlunos) => {
    const alunos = await Aluno.findAndCountAll({
      limit,
      offset,
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });

    return alunos;
  },
};
