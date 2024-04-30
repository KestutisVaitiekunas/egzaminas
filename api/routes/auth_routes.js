const express = require('express'); 
const mongoose = require('mongoose');

const router = express.Router();
const AuthController = require('../controllers/auth_controller');
const AuthRequest = require('../requests/auth_request');
const LoginAuthenticate = require('../strategys/login');
const RegisterAuthenticate = require('../strategys/register');

router.post( '/register', AuthRequest.registerValidation, RegisterAuthenticate(), AuthController.register)
router.post( '/login', AuthRequest.loginValidation, LoginAuthenticate())
// router.post( '/login', AuthRequest.loginValidation, LoginAuthenticate(), AuthController.login)


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