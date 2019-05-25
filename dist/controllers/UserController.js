"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _User = require('../Models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
   async index (req, res) {
    const users = await _User2.default.find()

    return res.json(users)
  }

   async create (req, res) {
    const user = await _User2.default.create(req.body)

    const fullName = user.fullName()

    return res.json(fullName)
  }
}

exports. default = new UserController()
