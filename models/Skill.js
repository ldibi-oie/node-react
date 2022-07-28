const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/connnection");
const User = require("./User");

class Skill extends Model {}

Skill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
  },
  {
    sequelize: sequelize,
    modelName: "skill",
    paranoid: true,
    freezeTableName: "Skill",
  }
);

module.exports = Skill;
