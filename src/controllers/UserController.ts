import { Request, Response, NextFunction } from 'express'
import User from '../Models/User'
import { next } from 'sucrase/dist/parser/tokenizer'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }

  public async create (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { firstName, lastName, email, password } = req.body

      if (!firstName || !lastName || !email || !password) {
        const error = new Error('Required field is missing.')
        error.status = 400
        throw error
      }

      if (await User.findOne({ email })) {
        const error = new Error('Email already registered.')
        error.status = 400
        throw error
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
