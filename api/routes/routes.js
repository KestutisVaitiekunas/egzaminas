const express = require('express'); 
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
    // console.log('GET request received');
    // q = "SELECT * FROM users";
    // req.db.query(q, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         res.send(err);
    //     } else {
    //         console.log(result);
    //         res.send(result);
    //     }
    // })
    const schema = new mongoose.Schema({
        name: String
      });
    const TestModel = mongoose.model('Test', schema);
    const new_name = new TestModel({
        name: 'test'
    })
    new_name.save();
})

module.exports = router