import { userModel } from "../models/userModel";

interface CreateUserProps {
  nome: string;
  email: string;
  senha: string;
}

interface FindUserByUsername {
  email: string;
}

export const userService = {
  createUser: async ({ nome, email, senha }: CreateUserProps) => {
    await userModel.createUser({ nome, email, senha });
  },

  findUserByUsername: async ({ email }: FindUserByUsername) => {
    return userModel.findUserByUsername(email);
  },
};
