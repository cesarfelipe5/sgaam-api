import { Op } from "sequelize";
import {
  Aluno,
  AlunoCreationAttributes,
  Pagamento,
  Plano,
  PlanoAluno,
  Telefone,
  Usuario,
} from "../models";

interface SearchAlunos {
  nome: string;
  limit: number;
  offset: number;
  showAll: boolean;
}

export const alunoService = {
  /**
   * Encontra um aluno pelo ID
   * @param id - ID do aluno
   */
  findAlunoById: async (id: number) => {
    const aluno = await Aluno.findByPk(id, {
      include: [
        {
          model: Telefone,
          as: "telefones",
        },
        {
          model: Plano,
          as: "planos",
        },
        {
          model: PlanoAluno,
          as: "planoAlunos",
          include: [
            {
              model: Pagamento,
              as: "pagamentos",
              required: false, // Isso significa que um aluno pode não ter pagamentos ainda

              include: [
                {
                  model: Usuario,
                  as: "usuarios",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    return aluno;
  },

  /**
   * Lista os alunos de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listAlunos: async ({
    limit,
    offset,
    showAll = false,
  }: {
    limit: number;
    offset: number;
    showAll?: boolean;
  }) => {
    const whereClause = {
      where: !showAll ? { isActive: true } : undefined,
    };

    const alunos = await Aluno.findAndCountAll({
      ...whereClause,
      include: [
        {
          model: Telefone,
          as: "telefones",
        },
        {
          model: Plano,
          as: "planos",
        },
        {
          model: PlanoAluno,
          as: "planoAlunos",
          include: [
            {
              model: Pagamento,
              as: "pagamentos",
              required: false, // Isso significa que um aluno pode não ter pagamentos ainda

              include: [
                {
                  model: Usuario,
                  as: "usuarios",
                },
              ],
            },
          ],
        },
      ],
      limit,
      offset,
    });

    return alunos;
  },

  /**
   * Cria um novo aluno
   * @param data - Dados do aluno a ser criado
   */
  createAluno: async (data: AlunoCreationAttributes): Promise<Aluno> => {
    try {
      const aluno = await Aluno.create(data);
      return aluno;
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      throw error; // Ou faça o tratamento adequado do erro
    }
  },

  /**
   * Atualiza um aluno pelo ID
   * @param id - ID do aluno
   * @param data - Dados a serem atualizados
   */
  updateAluno: async (
    id: number,
    data: Partial<AlunoCreationAttributes>
  ): Promise<Aluno> => {
    const aluno = await Aluno.findByPk(id, {
      include: [
        {
          model: Telefone,
          as: "telefones",
        },
        {
          model: Plano,
          as: "planos",
        },
        {
          model: PlanoAluno,
          as: "planoAlunos",
          include: [
            {
              model: Pagamento,
              as: "pagamentos",
              required: false, // Isso significa que um aluno pode não ter pagamentos ainda

              include: [
                {
                  model: Usuario,
                  as: "usuarios",
                },
              ],
            },
          ],
        },
      ],
    });

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

    // Atualiza a coluna isActive para false
    await aluno.update({ isActive: false });
  },

  /**
   * Busca por alunos com base em critérios
   * @param nome - Nome parcial ou completo do aluno
   */
  searchAlunos: async ({
    nome,
    limit,
    offset,
    showAll = false,
  }: SearchAlunos) => {
    // const whereClausule = !showAll ? { isActive: true } : undefined;

    const whereClause = {
      ...(showAll ? {} : { isActive: true }), // Se showAll for false, adiciona isActive: true
      nome: {
        [Op.like]: `%${nome}%`, // Condição para o nome
      },
    };

    const alunos = await Aluno.findAndCountAll({
      where: {
        ...whereClause,
      },
      limit,
      offset,
      include: [
        {
          model: Telefone,
          as: "telefones",
        },
        {
          model: Plano,
          as: "planos",
        },
        {
          model: PlanoAluno,
          as: "planoAlunos",
          include: [
            {
              model: Pagamento,
              as: "pagamentos",
              required: false, // Isso significa que um aluno pode não ter pagamentos ainda

              include: [
                {
                  model: Usuario,
                  as: "usuarios",
                },
              ],
            },
          ],
        },
      ],
    });

    return alunos;
  },
};
