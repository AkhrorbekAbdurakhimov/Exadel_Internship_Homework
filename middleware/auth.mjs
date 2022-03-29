import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT } from '../config/index.mjs';

import users from '../models/users.mjs';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT.sercetKey,
};

passport.use(new Strategy(options, async (jwtPayload, done) => {
  const user = await users.findById(jwtPayload.id);
  if (user) return done(null, user);
  return done(null, false);
}));

const auth = passport.authenticate('jwt', { session: false });

export default auth;
