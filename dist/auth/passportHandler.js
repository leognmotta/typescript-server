"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _passportjwt = require('passport-jwt');
var _User = require('../Models/User'); var _User2 = _interopRequireDefault(_User);

_dotenv2.default.config({ path: '.env' })

exports. default = function (passport) {
  var opts = {
    jwtFromRequest: _passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
  }

  passport.use(
    new (0, _passportjwt.Strategy)(opts, async function (jwtPayload, done) {
      _User2.default.findOne({ id: jwtPayload.sub }, function (err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    })
  )
}
