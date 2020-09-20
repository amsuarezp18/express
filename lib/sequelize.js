const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "", "", {
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

sequelize.authenticate().then(() => {
  console.log("Conection has been stablished successfully");
});

module.exports = sequelize;
