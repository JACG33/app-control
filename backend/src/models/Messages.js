import { sequelize } from '../db/connection.js'
import { Model, DataTypes } from 'sequelize'


class Messages extends Model { }

Messages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_conversation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    message_creator: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: "messages",
    modelName: "Messages"
  }
)

export default Messages