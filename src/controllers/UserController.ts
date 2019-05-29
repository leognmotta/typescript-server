import { Request, Response, NextFunction } from 'express'
import User from '../Models/User'
import ApiError from '../services/apiError'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }

  public async create (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { firstName, lastName, email, password } = req.body

      if (!firstName || !lastName || !email || !password) {
        throw new ApiError('Required field', 400, 'One or more required fields are missing.')
      }

      if (await User.findOne({ email })) {
        throw new ApiError('Email registered', 400, 'The email is already in use.')
      }

      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })

      const fullName = user.fullName()

      return res.json({ message: `The user ${fullName}, was created!` })
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
