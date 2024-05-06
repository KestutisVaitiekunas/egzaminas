const express = require('express'); 


const router = express.Router();
const AssetController = require('../controllers/asset_controller');
const AssetRequest = require('../requests/asset_request');

router.get( '/', AssetController.get)
router.get( '/id', AssetController.get_by_id)
// router.post( '/', AssetRequest.addAssetValidation,(req, res) => {
//     console.log(req.files);
//     console.log(req.body.title);
//     res.json({title:req.body.title, file: req.files})
// })
router.post( '/', AssetRequest.addAssetValidation, AssetController.add)
router.put( '/update', AssetController.update)
router.delete( '/delete', AssetController.delete)


module.exports = router