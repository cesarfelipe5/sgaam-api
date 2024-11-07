import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { PlanoAluno } from "./planoAlunoModel";
import { Plano } from "./planoModel";
import { Telefone } from "./telefoneModel";

// Interface para os atributos do Aluno
export interface AlunoAttributes {
  id?: number;
  nome: string;
  cpf: string;
  rg: string;
  cidade: string;
  cep: string;
  uf: string;
  numero: string;
  bairro: string;
  logradouro: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)

export class Aluno extends Model<AlunoAttributes> {
  static associate = () => {
    Aluno.hasMany(Telefone, {
      foreignKey: "idAluno",
      as: "telefones",
    });

    Aluno.belongsToMany(Plano, {
      through: PlanoAluno,
      foreignKey: "idAluno",
      otherKey: "idPlano",
      as: "planos",
    });
  };
}

Aluno.init(
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
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Alunos",
    timestamps: true,
  }
);
