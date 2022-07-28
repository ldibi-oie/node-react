const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connnection");
const User = require("./User");

class Messaging extends Model {}

Messaging.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
        unique: true,
      },
    },
    recipientId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
        unique: true,
      },
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    date: {
      type: DataTypes.DATE,
    },
    /*
            isDeleted: {
                type: DataTypes.BOOLEAN,
                default: false
            }
        */
  },
  {
    sequelize: sequelize,
    modelName: "messaging",
    paranoid: true,
    freezeTableName: "Messaging",
  }
);

module.exports = Messaging;
