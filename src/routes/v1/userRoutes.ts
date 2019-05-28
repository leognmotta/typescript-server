import { Router } from 'express'
import isAuth from '../../auth/isAuth'

import UserController from '../../controllers/UserController'

const routes = Router()

routes.get('/fetchall', UserController.index)
routes.post('/create', UserController.create)

export default routes
