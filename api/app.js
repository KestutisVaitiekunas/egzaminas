const express = require('express'); 
const cors = require('cors');
const passport = require('passport');



const mysql_db = require('./db/mysql/db');
const mongo_db = require('./db/mongo/db');
const test_router = require('./routes/test_routes');
const user_router = require('./routes/user_routes');
const auth_router = require('./routes/auth_routes');
const app = express(); 
const port = process.env.API_PORT || 4000; 

app.use(express.json());
// prijungiu prisijungima prie requesto
app.use(function (req, res, next) {
  req.db = mysql_db; // pakeisti priklausomai nuo reikalingos duomenu bazes
  // req.db = mongo_db;
  next();
});

app.use(passport.initialize());

app.use('/api', test_router);
app.use('/api/user', user_router);
app.use('/api/auth', auth_router);

app.use(cors({
    origin: 'http://localhost:4000',//priimu requestus tik is sito adreso
    // credentials: true
  }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })