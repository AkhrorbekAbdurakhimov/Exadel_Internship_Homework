const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const users = require('../models/users');

const { JWT } = require('../config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT.sercetKey,
};

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  const user = await users.findById(jwtPayload.id);
  if (user) return done(null, user);
  return done(null, false);
}));

const auth = passport.authenticate('jwt', { session: false });

module.exports = auth;
