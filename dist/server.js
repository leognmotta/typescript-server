"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

const server = _http2.default.createServer(_app2.default)

server.listen(
  process.env.PORT,
  () => {
    console.log(`listening on port ${process.env.PORT}`)
  }
)
