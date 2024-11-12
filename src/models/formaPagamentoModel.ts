import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Pagamento } from "./pagamentoModel";

// Interface para os atributos do Aluno
export interface FormaPagamentoAttributes {
  id: number;
  nome: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface FormaPagamentoCreationAttributes
  extends Optional<
    FormaPagamentoAttributes,
    "id" | "isActive" | "createdAt" | "updatedAt"
  > {}

export class FormaPagamento
  extends Model<FormaPagamentoAttributes, FormaPagamentoCreationAttributes>
  implements FormaPagamentoAttributes
{
  public id!: number;
  public nome!: string;
  public isActive!: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static initModel(sequelize: Sequelize): typeof FormaPagamento {
    FormaPagamento.init(
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
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "FormaPagamentos",
        timestamps: true,
      }
    );

    return FormaPagamento;
  }

  static associate() {
    FormaPagamento.hasMany(Pagamento, {
      foreignKey: "idFormaPagamento",
      as: "pagamentos",
    });
  }
}
