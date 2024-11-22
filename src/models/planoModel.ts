import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Aluno } from "./alunoModel";
import { Modalidade } from "./modalidadeModel";
import { PlanoAluno } from "./planoAlunoModel";
import { PlanoModalidade } from "./planoModalidadeModel";

// Interface para os atributos do Aluno
export interface PlanoAttributes {
  id: number;
  nome: string;
  descricao: string;
  // inicioVigencia: Date;
  // fimVigencia: Date;
  precoPadrao: Date;
  isActive: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlanoCreationAttributes
  extends Optional<
    PlanoAttributes,
    "id" | "isActive" | "createdAt" | "updatedAt"
  > {}

export class Plano
  extends Model<PlanoAttributes, PlanoCreationAttributes>
  implements PlanoAttributes
{
  public id!: number;
  public nome!: string;
  public descricao!: string;
  // public inicioVigencia!: Date;
  // public fimVigencia!: Date;
  public precoPadrao!: Date;
  public isActive!: Boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static initModel(sequelize: Sequelize): typeof Plano {
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
        // inicioVigencia: {
        //   type: DataTypes.DATE,
        //   allowNull: false,
        // },
        // fimVigencia: {
        //   type: DataTypes.DATE,
        //   allowNull: false,
        // },
        precoPadrao: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: "Planos",
        timestamps: true,
      }
    );

    return Plano;
  }

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
