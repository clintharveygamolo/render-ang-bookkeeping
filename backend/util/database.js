import { Sequelize } from "sequelize";

console.log("Connecting to database with the following details:");
console.log("Database:", process.env.DATABASE_DB);
console.log("User:", process.env.DATABASE_USER);
console.log("Host:", process.env.DATABASE_HOST);
console.log("Port:", process.env.DATABASE_PORT || 3306);

const sequelize = new Sequelize(
  process.env.DATABASE_DB,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mariadb",
    dialectOptions: {
      connectTimeout: 10000,
    },
  },
);

export default sequelize;
