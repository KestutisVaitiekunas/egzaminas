const UserModel = require('../models/user_model');
const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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
    get_all: async (req, res) => {
        try {
            const [assets, fields] = await UserModel.get_all(req.db);
            res.json(assets); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    get_by_id: async (req, res) => {
        const {id} = req.body;
        try {
            const [asset, fields] = await UserModel.get_user_by_id(req.db, id);
            res.status(200).json({data: asset});    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    add: async (req, res) => {
        const validation = validationResult(req);
        if (validation.isEmpty()) {
            const { username, email, password } = req.body;
            const hashed_password = await bcrypt.hash(password, 10);
            data = { username, email, hashed_password };
            try{ 
                const new_user = await UserModel.add(req.db, data);
                res.status(200).json({data: new_user});
            }catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            const validation_messages = validationErrorMessages(validation.array());
            res.status(400).json(validation_messages);
        }
    },
    update_user: async (req, res) => {
        const validation = validationResult(req);
        const {id, username, email, role} = req.body;
        if (validation.isEmpty()) {
            try{
                const [user_in_db] = await UserModel.get_by_id(req.db, id);
                console.log(user_in_db);
                if (user_in_db) {
                    const data = { 
                        username: username || user_in_db[0].username, 
                        email: email || user_in_db[0].email, 
                        role: role || user_in_db[0].role 
                    };
                    console.log(data);
                    const updated_user = await UserModel.update_user(req.db, id, data);
                    res.status(200).json({data: updated_user});
                }else {
                    res.status(404).json({ error: 'User not found' });
                }
            }catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            const validation_messages = validationErrorMessages(validation.array());
            res.status(400).json(validation_messages);
        }
    },
    update_password: async (req, res) => {
        const validation = validationResult(req);
        const {id, password} = req.body;
        if (validation.isEmpty()) {
            try{
                const [user_in_db] = await UserModel.get_by_id(req.db, id);
                if (user_in_db) {
                    const hashed_password = await bcrypt.hash(password, 10);
                    const updated_password = await UserModel.update_password(req.db, id, hashed_password);
                    res.status(200).json({message: 'Password updated successfully'});
                }else {
                    res.status(404).json({ error: 'User not found' });
                }
            }catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            const validation_messages = validationErrorMessages(validation.array());
            res.status(400).json(validation_messages);
        }
    },
    delete: async (req, res) => {
        const {id} = req.body;
        try{
            const user_in_db = await UserModel.get_by_id(req.db, id);
            if (user_in_db) {
                const deleted_user = await UserModel.delete(req.db, id);
                res.status(200).json({
                    message: 'User deleted successfully',
                    data: deleted_user});
            }else {
                res.status(404).json({ error: 'Asset not found' });
            }
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}