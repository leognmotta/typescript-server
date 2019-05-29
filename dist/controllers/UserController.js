"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _User = require('../Models/User'); var _User2 = _interopRequireDefault(_User);
var _apiError = require('../services/apiError'); var _apiError2 = _interopRequireDefault(_apiError);

class UserController {
   async index (req, res) {
    const users = await _User2.default.find()

    return res.json(users)
  }

   async create (req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body

      if (!firstName || !lastName || !email || !password) {
        throw new (0, _apiError2.default)('Required field', 400, 'One or more required fields are missing.')
      }

      if (await _User2.default.findOne({ email })) {
        throw new (0, _apiError2.default)('Email registered', 400, 'The email is already in use.')
      }

      const user = await _User2.default.create({
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

exports. default = new UserController()
