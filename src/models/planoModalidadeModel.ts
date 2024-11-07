import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

// Interface para os atributos do Aluno
export interface PlanoModalidadeAttributes {
  id?: number;
  idModalidade: number;
  idPlano: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PlanoModalidade extends Model<PlanoModalidadeAttributes> {}

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
