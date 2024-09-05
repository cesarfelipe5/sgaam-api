import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2/promise";
import { pool } from "../config/db";

export interface User {
  id: number;
  username: string;
  password: string;
}

export const userModel = {
  findUserByUsername: async (username: string): Promise<User | null> => {
    const [results] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [username]
    );

    return (results as RowDataPacket[])[0] as User | null;
  },

  createUser: async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );
  },
};
