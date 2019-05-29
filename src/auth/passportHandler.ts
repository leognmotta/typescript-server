import dotenv from 'dotenv'
import { ExtractJwt, Strategy } from 'passport-jwt'
import User from '../Models/User'

dotenv.config({ path: '.env' })

export default function (passport): void {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
  }

  passport.use(
    new Strategy(opts, async function (jwtPayload, done): Promise<void> {
      User.findOne({ id: jwtPayload.sub }, function (err, user): void {
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
