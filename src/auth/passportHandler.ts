import dotenv from 'dotenv'
import { ExtractJwt, Strategy } from 'passport-jwt'
import User from '../Models/User'

dotenv.config({ path: '.env' })

export default function (passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
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
