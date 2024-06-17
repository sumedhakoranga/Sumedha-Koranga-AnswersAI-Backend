const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE_STORAGE || "./database.sqlite",
  logging: console.log,
});

module.exports = sequelize;
