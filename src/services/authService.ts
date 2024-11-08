import bcrypt from "bcryptjs";
import { Usuario, UsuarioCreationAttributes } from "../models/usuarioModel"; // Importe o modelo User do Sequelize

interface FindUserByUsernameProps {
  email: string;
}

export const authService = {
  /**
   * Cria um novo usuário com a senha criptografada
   * @param nome - Nome do usuário
   * @param email - Email do usuário
   * @param senha - Senha do usuário (em plain text)
   */
  async createUser({ nome, email, senha }: UsuarioCreationAttributes) {
    // Criptografa a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Usa diretamente o Sequelize para criar um novo usuário
    return await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
    });
  },

  /**
   * Encontra um usuário pelo email
   * @param email - Email do usuário
   */
  async findUserByUsername({ email }: FindUserByUsernameProps) {
    // Usa diretamente o Sequelize para encontrar o usuário
    return await Usuario.findOne({ where: { email } });
  },
};
