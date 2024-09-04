import { Model, DataTypes } from "sequelize"
import {sequelize} from "../db/connection.js"

class Roles extends Model { }

Roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "roles",
    modelName: "Roles"
  }
)

export default Roles