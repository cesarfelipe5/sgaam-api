import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2/promise";
import { pool } from "../config/db";

export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

interface CreateUserProps {
  nome: string;
  email: string;
  senha: string;
}

export const userModel = {
  findUserByUsername: async (email: string): Promise<User | null> => {
    const [results] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    return (results as RowDataPacket[])[0] as User | null;
  },

  createUser: async ({ nome, email, senha }: CreateUserProps) => {
    const hashedPassword = await bcrypt.hash(senha, 10);

    return await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, hashedPassword]
    );
  },
};
