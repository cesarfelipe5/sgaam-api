import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Permissao } from "./permissaoModel";
import { Usuario } from "./usuarioModel";

// Interface para os atributos do Aluno
export interface UsuarioPermissaoAttributes {
  id: number;
  idUsuario: number;
  idPermissao: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UsuarioPermissaoCreationAttributes
  extends Optional<
    UsuarioPermissaoAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

export class UsuarioPermissao
  extends Model<UsuarioPermissaoAttributes, UsuarioPermissaoCreationAttributes>
  implements UsuarioPermissaoAttributes
{
  public id!: number;
  public idUsuario!: number;
  public idPermissao!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static initModel(sequelize: Sequelize): typeof UsuarioPermissao {
    UsuarioPermissao.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },

        idPermissao: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        idUsuario: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "UsuarioPermissoes",
        timestamps: true,
      }
    );

    return UsuarioPermissao;
  }

  static associate() {
    UsuarioPermissao.belongsTo(Permissao, {
      foreignKey: "idPermissao",
      as: "permissao",
    });

    UsuarioPermissao.belongsTo(Usuario, {
      foreignKey: "idUsuario",
      as: "usuario",
    });
  }
}
