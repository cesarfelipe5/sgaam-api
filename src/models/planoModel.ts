import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Aluno } from "./alunoModel";
import { Modalidade } from "./modalidadeModel";
import { PlanoAluno } from "./planoAlunoModel";
import { PlanoModalidade } from "./planoModalidadeModel";

// Interface para os atributos do Aluno
export interface PlanoAttributes {
  id?: number;
  nome: string;
  descricao: string;
  inicioVigencia: Date;
  fimVigencia: Date;
  precoPadrao: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlanoCreationAttributes
  extends Optional<PlanoAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Plano extends Model<PlanoAttributes> {
  static associate() {
    Plano.belongsToMany(Aluno, {
      through: PlanoAluno,
      foreignKey: "idPlano",
      otherKey: "idAluno",
      as: "alunos",
    });

    Plano.belongsToMany(Modalidade, {
      through: PlanoModalidade,
      foreignKey: "idPlano",
      otherKey: "idModalidade",
      as: "modalidades",
    });
  }
}

Plano.init(
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    inicioVigencia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fimVigencia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    precoPadrao: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Planos",
    timestamps: true,
  }
);
