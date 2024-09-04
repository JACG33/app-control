import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/connection.js";
import { Users } from "./User.js";
import Messages from "./Messages.js";

class Conversations extends Model { }

Conversations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    conversation_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    conversation_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "open",
    }
  },
  {
    sequelize,
    tableName: "conversations",
    modelName: "Conversations"
  }
)

Conversations.hasMany(Users, {
  foreignKey: "id_user",
  targetKey: "id_user"
})

Conversations.hasMany(Messages, {
  foreignKey: "id_conversation",
  targetKey: "id",
  onDelete:"CASCADE"
})

export default Conversations