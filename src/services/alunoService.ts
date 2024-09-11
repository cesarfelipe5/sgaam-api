import { Op } from "sequelize";
import { Aluno, AlunoCreationAttributes } from "../models";

export const alunoService = {
  /**
   * Encontra um aluno pelo ID
   * @param id - ID do aluno
   */
  async findAlunoById(id: number) {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    return aluno;
  },

  /**
   * Cria um novo aluno
   * @param data - Dados do aluno a ser criado
   */
  async createAluno(data: AlunoCreationAttributes): Promise<Aluno> {
    const aluno = await Aluno.create(data);

    return aluno;
  },

  /**
   * Remove um aluno pelo ID
   * @param id - ID do aluno a ser removido
   */
  async removeAlunoById(id: number) {
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
  async updateAlunoById(id: number, data: Partial<AlunoCreationAttributes>) {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    await aluno.update(data);

    return aluno;
  },

  /**
   * Busca por alunos com base em critérios
   * @param nome - Nome parcial ou completo do aluno
   */
  async searchAlunos(nome: string) {
    const alunos = await Aluno.findAll({
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });

    return alunos;
  },
};
