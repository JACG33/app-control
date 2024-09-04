import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/connection.js";
import Roles from './Roles.js'

class Users extends Model { }

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
    ,
    id_user: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
    ,
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false
    }
    ,
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
    ,
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 3
    }
  },
  {
    sequelize,
    tableName: "users",
    modelName: "Users"
  }
)

Users.hasOne(Roles, {
  foreignKey: 'id',
  sourceKey: 'role_id',

})

Roles.hasMany(Users, {
  foreignKey: 'role_id',
  targetKey: 'id',
})



export { Users };
