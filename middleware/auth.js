const fs = require('fs');
const path = require('path');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const filePath = path.join(process.cwd(), 'database', 'users.json');
const users = fs.readFileSync(filePath, 'utf8') ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];

const { JWT } = require('../config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT.sercetKey,
};

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
  const user = users.find((value) => value.email === jwtPayload.email);
  if (user) return done(null, user);
  return done(null, false);
}));

const auth = passport.authenticate('jwt', { session: false });

module.exports = auth;
