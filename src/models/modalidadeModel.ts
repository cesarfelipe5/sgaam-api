import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

// Interface para os atributos do Aluno
export interface ModalidadeAttributes {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  valor: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface ModalidadeCreationAttributes
  extends Optional<ModalidadeAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Modalidade extends Model<
  ModalidadeAttributes,
  ModalidadeCreationAttributes
> {
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public status!: string;
  public valor!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Modalidade.init(
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
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    valor: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "modalidades",
    timestamps: true,
  }
);
