const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const AuthModel = require('../models/auth_model');

const bearerstrategy = new BearerStrategy(
    { passReqToCallback: true },
    async (req, token, done) => {
        try {
            let [token_in_db] = await AuthModel.get_token(req.db, token);
            token_in_db = token_in_db[0];
            if (!token_in_db) return done(null, false, { message: 'Access denied' });
            return done(null, token_in_db.user_id);
        } catch (error) {
            return done(error, false, { message: 'Internal server error', data: error });
        }
    }
);

passport.use('bearer', bearerstrategy);

const passport_authenticate = () => {
    return (req, res, next) => {
        passport.authenticate('bearer', { session: false }, (err, user, info) => {
            // console.log(err);
            // console.log(user);
            // console.log(info);
            if (err) return res.status(500).json({ auth_status: false, data: { message: info } });
            if (!user) {
                const parsed_info = info.split(",")[2].split("=")[1].replace(/\"/g, '');
                return res.status(401).json({ auth_status: false, data: { message: parsed_info } });
            }
            return res.status(200).json({auth_status: true, data: { user_id: user }});
        })(req, res, next);
    }
};

module.exports = passport_authenticate;