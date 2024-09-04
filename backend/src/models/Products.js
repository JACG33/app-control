import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

class Products extends Model { }

Products.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: "products",
    modelName: "Products"
  }
)

export { Products }