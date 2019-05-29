"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _passport = require('passport'); var _passport2 = _interopRequireDefault(_passport);

exports. default = _passport2.default.authenticate('jwt', { session: false })
