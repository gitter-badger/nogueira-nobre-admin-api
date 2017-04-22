import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jwt-simple';
import { JWT_SECRECT } from './constants';
import User from '../models/User';

const opts = {
  secretOrKey: JWT_SECRECT,
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
};

const strategy = new Strategy(opts, (payload, done) => {
  User.findById(payload.sub)
    .then((user) => {
      if (user) return done(null, { user_id: user._id });

      return done(null, false);
    })
    .catch(err => done(err, null));
});

passport.use(strategy);

export const initializeAuth = () => passport.initialize();
export const authenticate = () => passport.authenticate('jwt', { session: false });
export const createJWT = payload => jwt.encode(payload, JWT_SECRECT);
