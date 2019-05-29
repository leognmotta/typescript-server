"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);











const UserSchema = new (0, _mongoose.Schema)(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, select: false }
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await _bcrypt2.default.hash(this.password, 10)
    this.password = hash
  }

  next()
})

UserSchema.methods.fullName = function () {
  return `${this.firstName} ${this.lastName}`
}

UserSchema.methods.getToken = function () {
  return _jsonwebtoken2.default.sign({ userId: this._id }, process.env.SECRET, { expiresIn: '5h' })
}

exports. default = _mongoose.model('User', UserSchema)
