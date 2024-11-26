import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { AulaExperimental } from "./aulaExperimentalModel";
import { PlanoModalidade } from "./planoModalidadeModel";
import { Plano } from "./planoModel";

// Interface para os atributos do Aluno
export interface ModalidadeAttributes {
  id: number;
  nome: string;
  descricao: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModalidadeCreationAttributes
  extends Optional<
    ModalidadeAttributes,
    "id" | "isActive" | "createdAt" | "updatedAt"
  > {}

export class Modalidade
  extends Model<ModalidadeAttributes, ModalidadeCreationAttributes>
  implements ModalidadeAttributes
{
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public isActive!: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static initModel(sequelize: Sequelize): typeof Modalidade {
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
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: "Modalidades",
        timestamps: true,
      }
    );
    return Modalidade;
  }
  static associate() {
    Modalidade.belongsToMany(Plano, {
      through: PlanoModalidade,
      foreignKey: "idModalidade",
      otherKey: "idPlano",
      as: "planos",
    });

    Modalidade.hasMany(AulaExperimental, {
      foreignKey: "idModalidade",
      as: "modalidades",
    });
  }
}
