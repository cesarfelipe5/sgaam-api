import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { FormaPagamento } from "./formaPagamentoModel";
import { PlanoAluno } from "./planoAlunoModel";
import { Usuario } from "./usuarioModel";

// Interface para os atributos do Aluno
export interface PagamentoAttributes {
  id?: number;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  dataVencimento: Date;
  pago: boolean;
  idUsuario: number;
  idPlanoAluno: number;
  idFormaPagamento: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Pagamento extends Model<PagamentoAttributes> {
  static associate() {
    Pagamento.belongsTo(Usuario, {
      foreignKey: "idUsuario",
      as: "usuario",
    });

    Pagamento.belongsTo(PlanoAluno, {
      foreignKey: "idPlanoAluno",
      as: "planoAluno",
    });

    Pagamento.belongsTo(FormaPagamento, {
      foreignKey: "idFormaPagamento",
      as: "formaDePagamento",
    });
  }
}

Pagamento.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    dataPagamento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valor: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataVencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pago: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idPlanoAluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idFormaPagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Pagamentos",
    timestamps: true,
  }
);
