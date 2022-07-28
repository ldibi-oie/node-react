const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/connnection");
const User = require("./User");

class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
        unique: true,
      },
    },
  },
  {
    sequelize: sequelize,
    modelName: "contact",
    paranoid: true,
    freezeTableName: "Contact",
  }
);

module.exports = Contact;
