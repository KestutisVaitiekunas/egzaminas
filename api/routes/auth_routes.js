const express = require('express'); 

const router = express.Router();
const AuthRequest = require('../requests/auth_request');
const LoginAuthenticate = require('../passport/login');
const RegisterAuthenticate = require('../passport/register');

router.post( '/register', AuthRequest.registerValidation, RegisterAuthenticate())
router.post( '/login', AuthRequest.loginValidation, LoginAuthenticate())

module.exports = router