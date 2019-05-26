import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStatic } from 'passport'
import User from '../Models/User'

export default function (passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '1k20D2u27dDd2OOai1239889S874'
  }

  passport.use(
    new Strategy(opts, async function (jwt_payload, done) {
      User.findOne({ id: jwt_payload.sub }, function (err, user) {
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
