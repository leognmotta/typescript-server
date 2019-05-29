"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

var _UserController = require('../../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const routes = _express.Router.call(void 0, )

routes.get('/fetchall', _UserController2.default.index)
routes.post('/create', _UserController2.default.create)

exports. default = routes
