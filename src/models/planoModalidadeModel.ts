import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

// Interface para os atributos do Aluno
export interface PlanoModalidadeAttributes {
  id: number;
  idModalidade: number;
  idPlano: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface PlanoModalidadeCreationAttributes
  extends Optional<
    PlanoModalidadeAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

export class PlanoModalidade
  extends Model<PlanoModalidadeAttributes, PlanoModalidadeCreationAttributes>
  implements PlanoModalidadeAttributes
{
  public id!: number;
  public idModalidade!: number;
  public idPlano!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

PlanoModalidade.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    idModalidade: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    idPlano: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "PlanoModalidades",
    timestamps: true,
  }
);
