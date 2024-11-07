import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Aluno } from "./alunoModel";
import { FormaPagamento } from "./formaPagamentoModel";
import { Plano } from "./planoModel";

// Interface para os atributos do Aluno
export interface PlanoAlunoAttributes {
  id?: number;
  nome: string;
  isExperimental: boolean;
  idAluno: number;
  idPlano: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface PlanoAlunoCreationAttributes
  extends Optional<PlanoAlunoAttributes, "id" | "createdAt" | "updatedAt"> {}

export class PlanoAluno extends Model<PlanoAlunoAttributes> {
  // Método para definir associações
  static associate() {
    PlanoAluno.belongsTo(Aluno, {
      foreignKey: "idAluno",
      as: "aluno",
    });

    PlanoAluno.belongsTo(Plano, {
      foreignKey: "idPlano",
      as: "plano",
    });

    PlanoAluno.hasMany(FormaPagamento, {
      foreignKey: "idPlanoAluno",
      as: "pagamentos",
    });
  }
}

PlanoAluno.init(
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
    isExperimental: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    idAluno: {
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
    tableName: "PlanoAlunos",
    timestamps: true,
  }
);
