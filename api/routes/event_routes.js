const express = require('express'); 


const router = express.Router();
const EventController = require('../controllers/event_controller');
const EventRequest = require('../requests/event_request');

router.get( '/', EventController.get)
router.get( '/id', EventController.get_by_id)
router.post( '/', EventRequest.addEventValidation, EventController.add)
router.put( '/update', EventController.update)
router.delete( '/delete', EventController.delete)
router.get('/categories', EventController.get_categories)


module.exports = router