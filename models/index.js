const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/connnection");
const bcryptjs = require("bcryptjs");
const User = require("./User");

exports.User = require("./User");
exports.Contact = require("./Contact");
exports.Skill = require("./Skill");
exports.Messaging = require("./Messaging");

User.addHook("beforeCreate", async (user) => {
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
});

User.addHook("beforeUpdate", async (user, { fields }) => {
  if (fields.includes("password")) {
    user.password = await bcryptjs.hash(
      user.password,
      await bcryptjs.genSalt()
    );
  }
});

sequelize.sync();
console.log("All models were synchronized successfully.");
