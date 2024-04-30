const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user_model');
const bcrypt = require('bcryptjs');
const pool = require('../db/mysql/db');

const localStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            let [user] = await UserModel.get_by_email(pool, email);
            user = user[0];
            if (!user) {
                return done(null, false, { message: 'No user with this email.' });
            }
            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user, { message: 'Logged in successfully' });
        } catch (error) {
            return done(error, false, { message: 'Internal server error' });
        }
    }
);

passport.use('local', localStrategy);
const passport_authenticate = () => {
    return (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err) req.message = info.message;
            if (!user) req.message = info.message
            req.user = user;
            req.message = info.message
            next();
        })( req, res, next );
    }
};

module.exports = passport_authenticate;
