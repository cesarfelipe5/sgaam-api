import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Pagamento } from "./pagamentoModel";
import { Permissao } from "./permissaoModel";
import { UsuarioPermissao } from "./usuarioPermissaoModel";

export interface UsuarioAttributes {
  id: number;
  nome: string;
  email: string;
  senha: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UsuarioCreationAttributes
  extends Optional<UsuarioAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Usuario
  extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes
{
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): typeof Usuario {
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

    return Usuario;
  }

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
