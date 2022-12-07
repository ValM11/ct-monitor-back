const mySQL = require("mysql2");

require("dotenv").config();

const connectionDb = mySQL.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PWD,
  database: process.env.SQL_DATABASE,
});

module.exports = { connectionDb };
