const express = require('express'); 

const router = express.Router();
const AuthRequest = require('../requests/auth_request');
const LoginAuthenticate = require('../passport/login');
const RegisterAuthenticate = require('../passport/register');
const BearerAuthenticate = require('../passport/authenticate');
const logout_user = require('../passport/logout');

router.post( '/register', AuthRequest.registerValidation, RegisterAuthenticate())
router.post( '/login', AuthRequest.loginValidation, LoginAuthenticate())
router.get( '/secure', BearerAuthenticate())
router.post( '/logout', logout_user())

module.exports = router