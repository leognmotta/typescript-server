"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _bodyparser = require('body-parser'); var bodyParser = _interopRequireWildcard(_bodyparser);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _compression = require('compression'); var _compression2 = _interopRequireDefault(_compression);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _morgan = require('morgan'); var _morgan2 = _interopRequireDefault(_morgan);

var _v1 = require('./routes/v1'); var _v12 = _interopRequireDefault(_v1);
var _apiError = require('./services/apiError'); var _apiError2 = _interopRequireDefault(_apiError);
_dotenv2.default.config({ path: '.env' })

class App {
  

   constructor () {
    this.express = _express2.default.call(void 0, )

    this.middlewares()
    this.database()
    this.routes()
    this.errorHandler()
  }

   middlewares () {
    this.express.use(_helmet2.default.call(void 0, ))
    this.express.use(_compression2.default.call(void 0, ))
    if (process.env.APP === 'production') {
      this.express.use(_morgan2.default.call(void 0, 'combined'))
    } else {
      this.express.use(_morgan2.default.call(void 0, 'dev'))
    }
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(_cors2.default.call(void 0, ))
  }

   errorHandler () {
    this.express.use((req, res, next) => {
      const error = new (0, _apiError2.default)('Route not found.', 404, 'The route is nout found.')
      next(error)
    })

    this.express.use(
      (error, req, res) => {
        console.log(error)
        const status = error.statusCode || 500
        const message = error.message
        res.status(status).json({ message: message, status: status })
      }
    )
  }

   database () {
    _mongoose2.default.set('debug', true)
    _mongoose2.default.set('useCreateIndex', true)
    _mongoose2.default.connect(`mongodb://${process.env.DB_HOST}:27017/tsnode`, {
      useNewUrlParser: true
    })
    _mongoose2.default.connection
      .once('open', () => console.log(`connected to databse`))
      .on('error', (error) => console.warn('error: ' + error))
  }

   routes () {
    this.express.use('/api/v1', _v12.default)
  }
}

exports. default = new App().express
