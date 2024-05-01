const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user_model');
const AuthModel = require('../models/auth_model');
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


const loginStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async (req, email, password, done) => {
        try {
            let [user] = await UserModel.get_by_email(req.db, email);
            user = user[0];
            if (!user) {
                return done(null, false, { message: {path: "email", text:'No user with this email.'}});
            }
            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return done(null, false, { message: {path: "password", text:'Incorrect password.'}});
            }
            return done(null, user, { message: 'Logged in successfully' });
        } catch (error) {
            return done(error, false, { message: 'Internal server error', data: error });
        }
    }
);

passport.use('login', loginStrategy);
const passport_authenticate = () => {
    return (req, res, next) => {
        passport.authenticate('login', {session: false}, async (err, user, info) => {
            const validation = validationResult(req);
            if (validation.isEmpty()) {
                if (err) return res.status(500).json({login_status: false, data: {message: info.message} });
                if (!user) return res.status(401).json({login_status: false, data: {message: info.message} });
                const token_body = {id: user.id, email: user.email};
                const token = jwt.sign(token_body, process.env.JWT_SECRET_KEY);
                const [token_in_db] = await AuthModel.get_token_by_user_id(req.db, user.id);
                const data = { token: token, user_id: user.id };
                if (token_in_db[0]) {
                    await AuthModel.update_token(req.db, data);
                } else {
                    await AuthModel.insert_token(req.db, data);
                }
                res.status(200).json({
                    login_status: true, 
                    data: {
                        token: token, 
                        user: {
                            id: user.id, 
                            username: user.username
                        }
                    }
                });
            } else {
                const validation_messages = validationErrorMessages(validation.array());
            res.status(400).json(validation_messages);
            }
        })( req, res, next );
    }
};

module.exports = passport_authenticate;
