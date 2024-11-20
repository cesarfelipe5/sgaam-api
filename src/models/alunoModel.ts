import { DataTypes, Model, Optional, Sequelize } from "sequelize";
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
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface AlunoCreationAttributes
  extends Optional<
    AlunoAttributes,
    "id" | "isActive" | "createdAt" | "updatedAt"
  > {}

export class Aluno
  extends Model<AlunoAttributes, AlunoCreationAttributes>
  implements AlunoAttributes
{
  public id!: number;
  public nome!: string;
  public cpf!: string;
  public rg!: string;
  public cidade!: string;
  public cep!: string;
  public uf!: string;
  public numero!: string;
  public bairro!: string;
  public logradouro!: string;
  public isActive!: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static initModel(sequelize: Sequelize): typeof Aluno {
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
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Alunos",
        timestamps: true,
      }
    );
    return Aluno;
  }

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
