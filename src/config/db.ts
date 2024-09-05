import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// import dotenv from "dotenv";
// import { Sequelize } from "sequelize";

// dotenv.config();

// const DB_NAME = process.env.DB_NAME || "";
// const DB_USER = process.env.DB_USER || "";
// const DB_PASS = process.env.DB_PASS || "";
// const DB_HOST = process.env.DB_HOST || "";

// const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: DB_HOST,
//   dialect: "mysql",
// });

// export { db };
