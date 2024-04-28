const express = require('express'); 
const cors = require('cors');

const mysql_db = require('./db/mysql/db');
const mongo_db = require('./db/mongo/db');
const example_router = require('./routes/routes');
const app = express(); 
const port = process.env.API_PORT || 4000; 

app.use(express.json());
// prijungiu prisijungima prie requesto
app.use(function (req, res, next) {
  req.db = mysql_db; // pakeisti priklausomai nuo reikalingos duomenu bazes
  // req.db = mongo_db;
  next();
});
app.use('/api', example_router);

app.use(cors({
    origin: 'http://localhost:3000',//priimu requestus tik is sito adreso
    // credentials: true
  }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })