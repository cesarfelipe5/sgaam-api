import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import {
  Pagamento,
  Permissao,
  Usuario,
  UsuarioCreationAttributes,
} from "../models";

interface SearchUsuario {
  nome: string;
  limit: number;
  offset: number;
}

export const usuarioService = {
  /**
   * Encontra um usuario pelo ID
   * @param id - ID do usuario
   */
  findUsuarioById: async (id: number) => {
    const usuario = await Usuario.findByPk(id, {
      include: [
        { model: Permissao, as: "permissoes" },
        { model: Pagamento, as: "pagamentos" },
      ],
    });

    if (!usuario) {
      throw new Error("Usuario não encontrado");
    }

    return usuario;
  },

  /**
   * Lista os usuarios de forma paginada
   * @param limit - Máximo de dados a retornar
   * @param offset - Em qual posição inciar
   */
  listUsuarios: async ({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }) => {
    const usuarios = await Usuario.findAndCountAll({
      include: [
        { model: Permissao, as: "permissoes" },
        { model: Pagamento, as: "pagamentos" },
      ],
      limit,
      offset,
    });

    return usuarios;
  },

  /**
   * Cria um novo usuario
   * @param data - Dados do usuario a ser criado
   */
  createUsuario: async ({
    nome,
    email,
    senha,
  }: UsuarioCreationAttributes): Promise<Usuario> => {
    try {
      // Criptografa a senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Usa diretamente o Sequelize para criar um novo usuário
      const usuario = await Usuario.create({
        nome,
        email,
        senha: hashedPassword,
      });

      return usuario;
    } catch (error) {
      console.error("Erro ao criar usuario:", error);
      throw error; // Ou faça o tratamento adequado do erro
    }
  },

  /**
   * Atualiza um usuario pelo ID
   * @param id - ID do usuario
   * @param data - Dados a serem atualizados
   */
  updateUsuario: async (
    id: number,
    { nome, email, senha }: Partial<UsuarioCreationAttributes>
  ) => {
    try {
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }

      let dataToUpdate: Partial<UsuarioCreationAttributes> = {
        nome,
        email,
      };

      if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        dataToUpdate.senha = hashedPassword;
      }

      const usuarioNew = await usuario.update(dataToUpdate);

      return usuarioNew;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error; // Ou faça o tratamento adequado do erro
    }
  },

  /**
   * Busca por usuario com base em critérios
   * @param id - Id do usuario a remover
   */
  deleteUsuario: async (id: number): Promise<void> => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      throw new Error("Usuario não encontrado");
    }

    // Atualiza a coluna isActive para false
    await usuario.update({ isActive: false });
  },

  /**
   * Busca por usuario com base em critérios
   * @param nome - Nome parcial ou completo do usuario
   */
  searchUsuario: async ({ nome, limit, offset }: SearchUsuario) => {
    const usuario = await Usuario.findAndCountAll({
      limit,
      offset,
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });

    return usuario;
  },
};
