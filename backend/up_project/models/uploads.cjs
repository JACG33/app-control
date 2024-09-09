'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class uploads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  uploads.init({
    path: DataTypes.TEXT,
    nameFile: DataTypes.STRING,
    typeFile: DataTypes.STRING,
    sizeFile: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'uploads',
  });
  return uploads;
};