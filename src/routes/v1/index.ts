import { Router } from 'express'
import userRoutes from './userRoutes'
import passport from 'passport'
import handler from '../../auth/passportHandler'

handler(passport)

const routes = Router()

routes.use('/user', userRoutes)

export default routes
