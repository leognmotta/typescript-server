"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _userRoutes = require('./userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _passport = require('passport'); var _passport2 = _interopRequireDefault(_passport);
var _passportHandler = require('../../auth/passportHandler'); var _passportHandler2 = _interopRequireDefault(_passportHandler);

_passportHandler2.default.call(void 0, _passport2.default)

const routes = _express.Router.call(void 0, )

routes.use('/user', _userRoutes2.default)

exports. default = routes
