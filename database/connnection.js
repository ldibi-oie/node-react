const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("app", "root", "password", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  server: "db",
  operatorsAliases: false,
});


module.exports = sequelize;
global.sequelize = sequelize;
