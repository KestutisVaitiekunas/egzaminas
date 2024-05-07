const EventModel = require('../models/event_model');
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
            const [events] = await EventModel.get_events(req.db);
            res.json(events); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    get_by_id: async (req, res) => {
        const {id} = req.body;
        try {
            const [event] = await EventModel.get_event_by_id(req.db, id);
            res.status(200).json({data: event});    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    add: async (req, res) => {
        const validation = validationResult(req);

        if (validation.isEmpty()) {
            const data = req.body;
            try{ 
                const clientPublicFolder = path.resolve(__dirname, '..', '..','client', 'public', 'images', 'assets');
                const ext = {"image/webp": ".webp", "image/png": ".png", "image/jpeg": ".jpg", "image/jpg": ".jpg"};
                const new_event = await EventModel.add(req.db, data);
                const file_name = new_event[0].insertId + '_' + data.id + '_' + req.files[0].filename.slice(0, 6) + ext[req.files[0].mimetype];
                await AssetModel.update_image(req.db, new_event[0].insertId, file_name);
                fs.rename(req.files[0].path, clientPublicFolder + file_name, (err) => {
                    console.error('Error renaming/moving file:', err);
                    return res.status(500).send('Error renaming/moving file');
                })
                res.status(200).json({data: "event added successfully"});
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
            const event = await EventModel.get_event_by_id(req.db, id);
            if (event) {
                const updated_event = await EventModel.update(req.db, id, name);
                res.status(200).json({data: updated_event});
            }else {
                res.status(404).json({ error: 'event not found' });
            }
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    delete: async (req, res) => {
        const {id} = req.body;
        try{
            const event = await EventModel.get_event_by_id(req.db, id);
            if (asset) {
                const deleted_event = await EventModel.delete(req.db, id);
                res.status(200).json({data: deleted_event});
            }else {
                res.status(404).json({ error: 'event not found' });
            }
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    get_categories: async (req, res) => {
        try {
            const [categories] = await EventModel.get_categories(req.db);
            res.json({data: categories}); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}