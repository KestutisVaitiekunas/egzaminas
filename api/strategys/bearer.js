const passport = require('passport');
import { Strategy } from 'passport-http-bearer';

passport.use(new Strategy(
    (token, done) => {
        
    }
))