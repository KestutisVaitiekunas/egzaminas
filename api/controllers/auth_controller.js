// const AuthModel = require('../models/auth_model');
// const {validationResult} = require("express-validator");
// const bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');

// function validationErrorMessages(errors) {
//     const validation_err_messages = {}
//     const validation_messages = errors;
//     for (let msg of validation_messages) {
//         const key = msg.path;
//         const value = msg.msg;
//         if (!validation_err_messages[key]) {
//             validation_err_messages[key] = [value]
//         } else {
//             validation_err_messages[key].push(value)
//         }
//     }
//     return validation_err_messages
// }

// module.exports = {
//     register: async (req, res) => {
//         const validation = validationResult(req);
//         if (validation.isEmpty()) {
//             const { username, email, password } = req.body;
//             const hashed_password = await bcrypt.hash(password, 10);
//             data = { username, email, hashed_password };
//             try{ 
//                 const [user_in_db] = await UserModel.get_by_email(req.db, email);
                
//                 const new_user = await UserModel.register(req.db, data);
//                 const token_body = {id: new_user.id, email: new_user.email};
//                 const token = jwt.sign(token_body, process.env.JWT_SECRET_KEY);
//                 await req.db.qery('INSERT INTO tokens (token, user_id) VALUES (?, ?)', [token, new_user.id]);
//                 res.status(200).json({
//                     data: {
//                         token: token, 
//                         user: {
//                             id: new_user.id,
//                             username: new_user.username
//                         }
//                     }
//                 });
//             }catch (err) {
//                 console.error(err);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             }
//         } else {
//             const validation_messages = validationErrorMessages(validation.array());
//             res.status(400).json(validation_messages);
//         }
//     },
//     login: async (req, res) => {
//         const validation = validationResult(req);
//         if (!req.validation_messages) {
//             const token_body = {id: req.user.id, email: req.user.email};
//             const token = jwt.sign(token_body, process.env.JWT_SECRET_KEY);
//             const [token_in_db] = await AuthModel.get_token_by_user_id(req.db, req.user.id);
//             const data = { token: token, user_id: req.user.id };
//             if (token_in_db[0]) {
//                 await AuthModel.update_token(req.db, data);
//             } else {
//                 await AuthModel.insert_token(req.db, data);
//             }
//             res.status(200).json({
//                 login_status: true, 
//                 data: {
//                     token: token, 
//                     user: {
//                         id: req.user.id, 
//                         username: req.user.username
//                     }
//                 }
//             });
//         } else {
//             const validation_messages = validationErrorMessages(req.validation_messages);
//             res.status(400).json(validation_messages);
//         }
//     }
// }