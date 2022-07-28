const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/connnection");
const Skill = require("./Skill");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: { args: true, msg: "You must enter a email" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter a password" },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter a firstname" },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter a lastname" },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    skills: {
      type: DataTypes.UUID,
      references: {
        model: Skill,
        key: "id",
        unique: true,
      },
      allowNull: true,
    },

    friends: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
        unique: true,
      },
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    modelName: "user",
    paranoid: true,
    freezeTableName: "User",
  }
);

module.exports = User;
