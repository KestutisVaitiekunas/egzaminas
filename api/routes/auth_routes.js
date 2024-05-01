const express = require('express'); 

const router = express.Router();
const AuthRequest = require('../requests/auth_request');
const LoginAuthenticate = require('../passport/login');
const RegisterAuthenticate = require('../passport/register');
const BearerAuthenticate = require('../passport/bearer');

router.post( '/register', AuthRequest.registerValidation, RegisterAuthenticate())
router.post( '/login', AuthRequest.loginValidation, LoginAuthenticate())
router.get( '/secure', BearerAuthenticate())

module.exports = router