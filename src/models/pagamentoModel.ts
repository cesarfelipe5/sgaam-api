import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { FormaPagamento } from "./formaPagamentoModel";
import { PlanoAluno } from "./planoAlunoModel";
import { Usuario } from "./usuarioModel";

// Interface para os atributos do Aluno
export interface PagamentoAttributes {
  id: number;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pago: boolean;
  idUsuario: number;
  idPlanoAluno: number;
  idFormaPagamento: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface PagamentoCreationAttributes
  extends Optional<PagamentoAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Pagamento
  extends Model<PagamentoAttributes, PagamentoCreationAttributes>
  implements PagamentoAttributes
{
  public id!: number;
  public dataPagamento!: Date;
  public valor!: number;
  public observacao!: string;
  public pago!: boolean;
  public idUsuario!: number;
  public idPlanoAluno!: number;
  public idFormaPagamento!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static initModel(sequelize: Sequelize): typeof Pagamento {
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
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
        },
        observacao: {
          type: DataTypes.STRING,
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

    return Pagamento;
  }

  static associate() {
    Pagamento.belongsTo(Usuario, {
      foreignKey: "idUsuario",
      as: "usuarios",
    });

    Pagamento.belongsTo(PlanoAluno, {
      foreignKey: "idPlanoAluno",
      as: "planoAlunos",
    });

    Pagamento.belongsTo(FormaPagamento, {
      foreignKey: "idFormaPagamento",
      as: "formaPagamentos",
    });
  }
}
