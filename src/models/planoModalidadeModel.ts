import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Modalidade } from "./modalidadeModel";
import { Plano } from "./planoModel";

// Interface para os atributos do Aluno
export interface PlanoModalidadeAttributes {
  id: number;
  idModalidade: number;
  idPlano: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface PlanoModalidadeCreationAttributes
  extends Optional<
    PlanoModalidadeAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

export class PlanoModalidade
  extends Model<PlanoModalidadeAttributes, PlanoModalidadeCreationAttributes>
  implements PlanoModalidadeAttributes
{
  public id!: number;
  public idModalidade!: number;
  public idPlano!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static initModel(sequelize: Sequelize): typeof PlanoModalidade {
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

    return PlanoModalidade;
  }

  // Método para definir associações
  static associate() {
    PlanoModalidade.belongsTo(Plano, {
      foreignKey: "idPlano",
      as: "plano",
    });

    PlanoModalidade.belongsTo(Modalidade, {
      foreignKey: "idModalidade",
      as: "modalidade",
    });
  }
}
