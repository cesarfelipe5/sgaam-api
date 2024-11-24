import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Aluno } from "./alunoModel";
import { Pagamento } from "./pagamentoModel";
import { Plano } from "./planoModel";

// Interface para os atributos do Aluno
export interface PlanoAlunoAttributes {
  id: number;
  idAluno: number;
  idPlano: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface PlanoAlunoCreationAttributes
  extends Optional<PlanoAlunoAttributes, "id" | "createdAt" | "updatedAt"> {}

export class PlanoAluno
  extends Model<PlanoAlunoAttributes, PlanoAlunoCreationAttributes>
  implements PlanoAlunoAttributes
{
  public id!: number;
  public idAluno!: number;
  public idPlano!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static initModel(sequelize: Sequelize): typeof PlanoAluno {
    PlanoAluno.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        idAluno: {
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
        tableName: "PlanoAlunos",
        timestamps: true,
      }
    );

    return PlanoAluno;
  }

  // Método para definir associações
  static associate() {
    PlanoAluno.belongsTo(Aluno, {
      foreignKey: "idAluno",
      as: "aluno",
    });

    PlanoAluno.belongsTo(Plano, {
      foreignKey: "idPlano",
      as: "plano",
    });

    PlanoAluno.hasMany(Pagamento, {
      as: "pagamentos",
      foreignKey: "idPlanoAluno",
    });
  }
}
