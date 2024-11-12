import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { PlanoModalidade } from "./planoModalidadeModel";
import { Plano } from "./planoModel";

// Interface para os atributos do Aluno
export interface ModalidadeAttributes {
  id: number;
  nome: string;
  descricao: string;
  status: boolean;
  valor: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModalidadeCreationAttributes
  extends Optional<
    ModalidadeAttributes,
    "id" | "status" | "createdAt" | "updatedAt"
  > {}

export class Modalidade
  extends Model<ModalidadeAttributes, ModalidadeCreationAttributes>
  implements ModalidadeAttributes
{
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public status!: boolean;
  public valor!: number;
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
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        valor: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
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
  }
}
