import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Usuario } from "./usuarioModel";
import { UsuarioPermissao } from "./usuarioPermissaoModel";

// Interface para os atributos do Aluno
export interface PermissaoAttributes {
  id?: number;
  nome: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Permissao extends Model<PermissaoAttributes> {
  static associate() {
    Permissao.belongsToMany(Usuario, {
      through: UsuarioPermissao,
      foreignKey: "idPermissao",
      otherKey: "idUsuario",
      as: "usuarios",
    });
  }
}

Permissao.init(
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
  },
  {
    sequelize,
    tableName: "Permissoes",
    timestamps: true,
  }
);
