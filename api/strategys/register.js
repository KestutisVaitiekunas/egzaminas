const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthModel = require('../models/auth_model');
const UserModel = require('../models/user_model');
const bcrypt = require('bcryptjs');
const pool = require('../db/mysql/db');

const localStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async (req, email, password, done) => {
        try {
            let [user] = await UserModel.get_by_email(pool, email);
            user = user[0];
            if (user) {
                return done(null, false, { message: {path: "email", text:'User with this email already exists.'}});
            }
            const hashed_password = await bcrypt.hash(password, 10);
            const data = { username: req.body.username, email, hashed_password };
            const new_user = await AuthModel.register(pool, data);
            return done(null, user, { message: 'Logged in successfully' });
        } catch (error) {
            return done(error, false, { message: 'Internal server error' });
        }
    }
);

passport.use('register', localStrategy);
const passport_authenticate = () => {
    return (req, res, next) => {
        passport.authenticate('register', {session: false}, (err, user, info) => {
            if (err) return res.status(500).json({login_status: false, data: {message: info.message} });
            if (!user) return res.status(401).json({login_status: false, data: {message: info.message} });
            req.user = user;
            req.message = info.message
            next();
        })( req, res, next );
    }
};

module.exports = passport_authenticate;
