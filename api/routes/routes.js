const express = require('express'); 
const mongoose = require('mongoose');

const router = express.Router();
const TestController = require('../controllers/test_controller');

router.get( '/', TestController.get)
router.post( '/', TestController.add)

// router.get('/', (req, res) => {

//     // const schema = new mongoose.Schema({
//     //     name: String
//     //   });
//     // const TestModel = mongoose.model('Test', schema);
//     // const new_name = new TestModel({
//     //     name: 'test2'
//     // })
//     // new_name.save();
// })



module.exports = router