var mysql = require('mysql');
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
  mysql_db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully');
    connection.release(); // Release the connection
  });
  
  module.exports = mysql_db;
  