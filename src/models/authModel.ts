import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db"; // Importe a conexão do Sequelize

export class User extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: true,
  }
);
