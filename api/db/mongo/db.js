const mongoose = require("mongoose");
require('dotenv').config();

// const mongo_connection = mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:27017/${process.env.DB_NAME}`);
const mongo_connection = mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
module.exports = mongo_connection;


