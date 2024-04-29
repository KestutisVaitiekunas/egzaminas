
const { get } = require('mongoose');
const TestModel = require('../models/test_model');

module.exports = {
    get: async (req, res) => {
        try {
            const [assets, fields] = await TestModel.get_assets(req.db);
            res.json(assets); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    get_by_id: async (req, res) => {
        const {id} = req.body;
        try {
            const [asset, fields] = await TestModel.get_asset_by_id(req.db, id);
            res.status(200).json({data: asset});    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    add: async (req, res) => {
        //reikia validuoti duomenis
        const validated_data = "test Name";
        try{ 
            const new_user = await TestModel.add(req.db, validated_data);
            res.status(200).json({data: new_user});
        }catch (err) {
            res.send(err);
        }
    },
    update: async (req, res) => {
        const {id, name} = req.body;
        try{
            const asset = await TestModel.get_asset_by_id(req.db, id);
            if (asset) {
                const updated_user = await TestModel.update(req.db, id, name);
                res.status(200).json({data: updated_user});
            }else {
                res.status(404).json({ error: 'Asset not found' });
            }
        }catch (err) {
            res.send(err);
        }
    },
    delete: async (req, res) => {
        const {id} = req.body;
        try{
            const asset = await TestModel.get_asset_by_id(req.db, id);
            if (asset) {
                const deleted_user = await TestModel.delete(req.db, id);
                res.status(200).json({data: deleted_user});
            }else {
                res.status(404).json({ error: 'Asset not found' });
            }
        }catch (err) {
            res.send(err);
        }
    }
}