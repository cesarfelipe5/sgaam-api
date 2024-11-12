import { Op } from "sequelize";
import {
  FormaPagamento,
  FormaPagamentoCreationAttributes,
  Pagamento,
} from "../models";

interface SearchFormaPagamento {
  nome: string;
  limit: number;
  offset: number;
}

export const formaPagamentoService = {
  /**
   * Encontra um forma pagamento pelo ID
   * @param id - ID do forma pagamento
   */
  findFormaPagamentoById: async (id: number) => {
    const formaPagamento = await FormaPagamento.findOne({
      where: {
        id,
        isActive: true,
      },
      include: [{ model: Pagamento }],
    });

    if (!formaPagamento) {
      throw new Error("Forma de pagamento não encontrada");
    }

    return formaPagamento;
  },
  /**
   * Lista as forma de pagamento de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listFormaPagamentos: async ({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }) => {
    const formaPagamentos = await FormaPagamento.findAndCountAll({
      include: [{ model: Pagamento, as: "pagamentos" }],
      where: {
        isActive: true,
      },
      limit,
      offset,
    });

    return formaPagamentos;
  },

  /**
   * Cria uma nova forma de pagamento
   * @param data - Dados da forma de pagamento a ser criado
   */
  createFormaPagamento: async (
    data: FormaPagamentoCreationAttributes
  ): Promise<FormaPagamento> => {
    try {
      const formaPagamento = await FormaPagamento.create(data);

      return formaPagamento;
    } catch (error) {
      console.error("Erro ao criar forma de pagamento:", error);
      throw error; // Ou faça o tratamento adequado do erro
    }
  },

  /**
   * Atualiza um forma de pagamento pelo ID
   * @param id - ID do forma de pagamento
   * @param data - Dados a serem atualizados
   */
  updateFormaPagamento: async (
    id: number,
    data: Partial<FormaPagamentoCreationAttributes>
  ) => {
    const formaPagamento = await FormaPagamento.findByPk(id);

    if (!formaPagamento) {
      throw new Error("Forma de pagamento não encontrado");
    }

    await formaPagamento.update(data);

    return formaPagamento;
  },

  /**
   * Busca por forma de pagamento com base em critérios
   * @param id - Id do forma de pagamento a remover
   */
  deleteFormaPagamento: async (id: number): Promise<void> => {
    const formaPagamento = await FormaPagamento.findByPk(id);

    if (!formaPagamento) {
      throw new Error("Forma de pagamento não encontrado");
    }

    await formaPagamento.update({ isActive: false });
  },

  /**
   * Busca por forma de pagamento com base em critérios
   * @param nome - Nome parcial ou completo da forma de pagamento
   */
  searchFormaPagamento: async ({
    nome,
    limit,
    offset,
  }: SearchFormaPagamento) => {
    const formaPagamento = await FormaPagamento.findAndCountAll({
      limit,
      offset,
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });

    return formaPagamento;
  },
};
