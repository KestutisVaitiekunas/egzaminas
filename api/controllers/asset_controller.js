const AssetModel = require('../models/asset_model');
const {validationResult} = require("express-validator");
const fs = require('node:fs/promises');
const path = require('node:path');


function validationErrorMessages(errors) {
    const validation_err_messages = {}
    const validation_messages = errors;
    for (let msg of validation_messages) {
        const key = msg.path;
        const value = msg.msg;
        if (!validation_err_messages[key]) {
            validation_err_messages[key] = [value]
        } else {
            validation_err_messages[key].push(value)
        }
    }
    return validation_err_messages
}

module.exports = {
    get: async (req, res) => {
        try {
            const [assets, fields] = await AssetModel.get_assets(req.db);
            res.json(assets); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    get_by_id: async (req, res) => {
        const {id} = req.body;
        try {
            const [asset, fields] = await AssetModel.get_asset_by_id(req.db, id);
            res.status(200).json({data: asset});    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    add: async (req, res) => {
        const validation = validationResult(req);

        if (validation.isEmpty()) {
            // console.log(req.body);
            // console.log(req.files);
            const data = req.body;
            try{ 
                const clientPublicFolder = path.resolve(__dirname, '..', '..','client', 'public', 'images', 'assets');
                const ext = {"image/webp": ".webp", "image/png": ".png", "image/jpeg": ".jpg", "image/jpg": ".jpg"};
                const new_asset = await AssetModel.add(req.db, data);
                const file_name = new_asset[0].insertId + '_' + data.id + '_' + req.files[0].filename.slice(0, 6) + ext[req.files[0].mimetype];
                await AssetModel.update_image(req.db, new_asset[0].insertId, file_name);
                fs.rename(req.files[0].path, clientPublicFolder + file_name, (err) => {
                    console.error('Error renaming/moving file:', err);
                    return res.status(500).send('Error renaming/moving file');
                })
                res.status(200).json({data: "Asset added successfully"});
            }catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            const validation_messages = validationErrorMessages(validation.array());
            res.status(400).json(validation_messages);
        }
    },
    update: async (req, res) => {
        const {id, name} = req.body;
        try{
            const asset = await AssetModel.get_asset_by_id(req.db, id);
            if (asset) {
                const updated_user = await TestModel.update(req.db, id, name);
                res.status(200).json({data: updated_user});
            }else {
                res.status(404).json({ error: 'Asset not found' });
            }
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    delete: async (req, res) => {
        const {id} = req.body;
        try{
            const asset = await AssetModel.get_asset_by_id(req.db, id);
            if (asset) {
                const deleted_user = await TestModel.delete(req.db, id);
                res.status(200).json({data: deleted_user});
            }else {
                res.status(404).json({ error: 'Asset not found' });
            }
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}