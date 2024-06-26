const express = require('express'); 
const cors = require('cors');
const passport = require('passport');
const mysql_db = require('./db/mysql/db');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(multer({ dest: "uploads/" }).any());

const event_router = require('./routes/event_routes');
const user_router = require('./routes/user_routes');
const auth_router = require('./routes/auth_routes');

const PORT = process.env.API_PORT || 4000; 

app.use(express.json());
// prijungiu prisijungima prie requesto
app.use(function (req, res, next) {
  req.db = mysql_db; 
  next();
});

app.use(passport.initialize());

app.use('/api/event', event_router);
app.use('/api/user', user_router);
app.use('/api/auth', auth_router);


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })