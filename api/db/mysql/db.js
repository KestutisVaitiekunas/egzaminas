var mysql = require("mysql2/promise");
require('dotenv').config();


const mysql_db = mysql.createPool({
    connectionLimit: 50,
    waitForConnections: true,
    queueLimit: 0,
  
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  module.exports = mysql_db;
  