import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Modalidade } from "./modalidadeModel";

// Interface para os atributos do Aluno
export interface AulaExperimentalAttributes {
  id?: number;
  nome: string;
  cpf: string;
  date: Date;
  hour: string;
  idModalidade: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface AulaExperimentalCreationAttributes
  extends Optional<
    AulaExperimentalAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

export class AulaExperimental
  extends Model<AulaExperimentalAttributes, AulaExperimentalCreationAttributes>
  implements AulaExperimentalAttributes
{
  public id!: number;
  public nome!: string;
  public cpf!: string;
  public date!: Date;
  public hour!: string;
  public idModalidade!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static initModel(sequelize: Sequelize): typeof AulaExperimental {
    AulaExperimental.init(
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
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        hour: {
          type: DataTypes.STRING(5),
          allowNull: false,
        },
        idModalidade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "AulaExperimentais",
        timestamps: true,
      }
    );
    return AulaExperimental;
  }

  static associate = () => {
    AulaExperimental.belongsTo(Modalidade, {
      foreignKey: "idModalidade",
      as: "modalidade",
    });
  };
}
