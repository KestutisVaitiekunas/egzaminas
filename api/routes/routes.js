const express = require('express'); 
const mongoose = require('mongoose');

const router = express.Router();
const TestController = require('../controllers/test_controller');
const TestRequest = require('../requests/test_request');

router.get( '/', TestController.get)
router.get( '/id', TestController.get_by_id)
router.post( '/', TestRequest.addAssetValidation, TestController.add)
router.put( '/update', TestController.update)
router.delete( '/delete', TestController.delete)

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