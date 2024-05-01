const express = require('express'); 

const router = express.Router();
const UserController = require('../controllers/user_controller');
const UserRequest = require('../requests/user_request');

router.get( '/', UserController.get_all)
router.get( '/id', UserController.get_by_id)
router.put( '/update', UserRequest.updateValidation, UserController.update_user)
router.put( '/updatepassword', UserRequest.updatePasswordValidation, UserController.update_password)
router.delete( '/delete', UserController.delete)

module.exports = router