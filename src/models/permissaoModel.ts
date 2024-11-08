import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Usuario } from "./usuarioModel";
import { UsuarioPermissao } from "./usuarioPermissaoModel";

// Interface para os atributos do Aluno
export interface PermissaoAttributes {
  id: number;
  nome: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para os atributos de criação do Aluno (sem o id, createdAt, updatedAt)
export interface PermissaoCreationAttributes
  extends Optional<PermissaoAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Permissao
  extends Model<PermissaoAttributes, PermissaoCreationAttributes>
  implements PermissaoAttributes
{
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

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
