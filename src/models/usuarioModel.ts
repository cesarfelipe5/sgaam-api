import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db"; // Importe a conexão do Sequelize
import { Pagamento } from "./pagamentoModel";
import { Permissao } from "./permissaoModel";
import { UsuarioPermissao } from "./usuarioPermissaoModel";

export interface UsuarioAttributes {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Usuario extends Model<UsuarioAttributes> {
  static associate() {
    Usuario.hasMany(Pagamento, {
      foreignKey: "idUsuario",
      as: "pagamentos",
    });

    Usuario.belongsToMany(Permissao, {
      through: UsuarioPermissao,
      foreignKey: "idUsuario",
      otherKey: "idPermissao",
      as: "permissoes",
    });
  }
}

Usuario.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Usuarios",
    timestamps: true,
  }
);
