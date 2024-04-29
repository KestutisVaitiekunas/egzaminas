const express = require('express'); 
const mongoose = require('mongoose');

const router = express.Router();
const UserController = require('../controllers/user_controller');
const UserRequest = require('../requests/user_request');

// router.get( '/', TestController.get)
// router.get( '/id', TestController.get_by_id)
router.post( '/register', UserRequest.registerValidation, UserController.add)
router.put( '/update', UserRequest.updateValidation, UserController.update_user)
router.put( '/updatepassword', UserRequest.updatePasswordValidation, UserController.update_password)
// router.delete( '/delete', TestController.delete)

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