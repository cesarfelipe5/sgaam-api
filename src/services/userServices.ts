import bcrypt from "bcryptjs";
import { userModel } from "../models/userModel";

interface CreateUserProps {
  username: string;
  password: string;
}

interface FindUserByUsername {
  username: string;
}

export const userService = {
  createUser: async ({ username, password }: CreateUserProps) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser(username, hashedPassword);
  },

  findUserByUsername: async ({ username }: FindUserByUsername) => {
    return userModel.findUserByUsername(username);
  },
};
