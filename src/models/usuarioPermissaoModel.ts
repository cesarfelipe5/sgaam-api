import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
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

export class UsuarioPermissao extends Model<UsuarioPermissaoAttributes> {
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
