const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthModel = require('../models/auth_model');
const UserModel = require('../models/user_model');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");

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

const localStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async (req, email, password, done) => {
        try {
            let [user] = await UserModel.get_by_email(req.db, email);
            user = user[0];
            if (!user) {
                // const data = { username: req.body.username, email, password };
                return done(null, false);
            }
            return done(null, user, { message: {"email":["User with this email already exists."]}});
        } catch (error) {
            return done(error, false, { message: 'Internal server error', data: error });
        }
    }
);

passport.use('register', localStrategy);
const passport_authenticate = () => {
    return (req, res, next) => {
        passport.authenticate('register', {session: false}, async (err, user, info) => {
            const validation = validationResult(req);
            if (validation.isEmpty()) {
                if (err) return res.status(500).json({login_status: false, data: {message: info.message} });
                if (!user) {
                    const data = { 
                        username: req.body.username, 
                        email: req.body.email, 
                        hashed_password: await bcrypt.hash(req.body.password, 10)};
                    const [new_user] = await AuthModel.register_user(req.db, data);
                    const token_body = {id: new_user.insertId, email: data.email};
                    const token = jwt.sign(token_body, process.env.JWT_SECRET_KEY);
                    const [token_in_db] = await AuthModel.get_token_by_user_id(req.db, new_user.insertId);
                    const token_data = { token: token, user_id: new_user.insertId };
                    if (token_in_db[0]) {
                        await AuthModel.update_token(req.db, token_data);
                    } else {
                        await AuthModel.insert_token(req.db, token_data);
                    }
                    res.status(200).json({
                        login_status: true, 
                        data: {
                            token: "Bearer " + token,  
                            user: {
                                id: new_user.insertId, 
                                username: new_user.username,
                                // role: new_user.role
                            }
                        }
                    });
                } else {
                    return res.status(401).json({login_status: false, data: {message: info.message} });
                };
            } else {
                const validation_messages = validationErrorMessages(validation.array());
                res.status(400).json({login_status: false, data: {message: validation_messages}});
            }

        })( req, res, next );
    }
};

module.exports = passport_authenticate;