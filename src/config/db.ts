import dotenv from "dotenv";

dotenv.config();

import { Dialect, Sequelize } from "sequelize";

const user = process.env.DB_USER || "admin";
const password = process.env.DB_PASS || "admin";
const name = process.env.DB_NAME || "sgaam";
const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || "3306";
const dialect = (process.env.DB_DIALECT as Dialect) || "mysql";

export const sequelize = new Sequelize(name, user, password, {
  host,
  port: +port,
  dialect,
  define: {
    timestamps: true,
  },
});

// Testar conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
