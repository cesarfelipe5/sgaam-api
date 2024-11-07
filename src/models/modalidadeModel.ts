import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { PlanoModalidade } from "./planoModalidadeModel";
import { Plano } from "./planoModel";

// Interface para os atributos do Aluno
export interface ModalidadeAttributes {
  id?: number;
  nome: string;
  descricao: string;
  status: string;
  valor: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Modalidade extends Model<ModalidadeAttributes> {
  static associate() {
    Modalidade.belongsToMany(Plano, {
      through: PlanoModalidade,
      foreignKey: "idModalidade",
      otherKey: "idPlano",
      as: "planos",
    });
  }
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
    tableName: "Modalidades",
    timestamps: true,
  }
);
