import {
  FormaPagamento,
  Pagamento,
  PagamentoCreationAttributes,
  PlanoAluno,
  Usuario,
} from "../models";

interface PagamentoUsuario {
  nome: string;
  limit: number;
  offset: number;
}

export const pagamentoService = {
  /**
   * Encontra um pagamento pelo ID
   * @param id - ID do pagamento
   */
  findPagamentoById: async (id: number) => {
    const pagamento = await Pagamento.findByPk(id, {
      include: [
        { model: Usuario, as: "usuarios" },
        { model: FormaPagamento, as: "formaPagamentos" },
        { model: PlanoAluno, as: "planoAlunos" },
      ],
    });

    if (!pagamento) {
      throw new Error("Pagamento não encontrado");
    }

    return pagamento;
  },

  /**
   * Lista os pagamentos de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listPagamentos: async ({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }) => {
    const pagamentos = await Pagamento.findAndCountAll({
      include: [
        { model: Usuario, as: "usuarios" },
        { model: FormaPagamento, as: "formaPagamentos" },
        { model: PlanoAluno, as: "planoAlunos" },
      ],
      limit,
      offset,
    });

    return pagamentos;
  },

  /**
   * Cria um novo pagamento
   * @param data - Dados do pagamento a ser criado
   */
  createPagamento: async (
    data: PagamentoCreationAttributes
  ): Promise<Pagamento> => {
    try {
      const pagamento = await Pagamento.create(data);

      return pagamento;
    } catch (error) {
      console.error("Erro ao criar o pagamento:", error);
      throw error; // Ou faça o tratamento adequado do erro
    }
  },

  /**
   * Atualiza um pagamento pelo ID
   * @param id - ID do pagamento
   * @param data - Dados a serem atualizados
   */
  updatePagamento: async (
    id: number,
    data: Partial<PagamentoCreationAttributes>
  ) => {
    const pagamento = await Pagamento.findByPk(id);

    if (!pagamento) {
      throw new Error("Pagamento não encontrado");
    }

    await pagamento.update(data);

    return pagamento;
  },

  /**
   * Busca por pagamento com base em critérios
   * @param id - Id do pagamento a remover
   */
  deletePagamento: async (id: number): Promise<void> => {
    const pagamento = await Pagamento.findByPk(id);

    if (!pagamento) {
      throw new Error("Pagamento não encontrado");
    }

    await pagamento.destroy();
  },
};
