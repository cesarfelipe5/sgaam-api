import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Aluno } from "./alunoModel";

export interface TelefoneAttributes {
  id?: number;
  numero: string;
  tipo: "Comercial" | "Residencial" | "Celular";
  idAluno: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TelefoneCreationAttributes
  extends Optional<TelefoneAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Telefone extends Model<
  TelefoneAttributes,
  TelefoneCreationAttributes
> {
  // Define a associação com o modelo Aluno
  static associate = () => {
    Telefone.belongsTo(Aluno, {
      foreignKey: "idAluno",
      as: "aluno",
    });
  };
}

Telefone.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idAluno: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Telefones",
    timestamps: true,
  }
);
