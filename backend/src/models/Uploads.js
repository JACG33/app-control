import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/connection.js";

class Uploads extends Model {}

Uploads.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nameFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sizeFile: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Uploads",
    tableName: "uploads",
  }
);

export default Uploads;
