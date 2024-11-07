import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Pagamento } from "./pagamentoModel";

// Interface para os atributos do Aluno
export interface FormaPagamentoAttributes {
  id?: number;
  nome: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FormaPagamento extends Model<FormaPagamentoAttributes> {
  static associate() {
    FormaPagamento.hasMany(Pagamento, {
      foreignKey: "idFormaPagamento",
      as: "pagamentos",
    });
  }
}

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
  },
  {
    sequelize,
    tableName: "FormaPagamentos",
    timestamps: true,
  }
);
