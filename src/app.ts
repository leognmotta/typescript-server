import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from 'morgan'

import routes from './routes/v1'

dotenv.config({ path: '.env' })

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
    this.errorHandler()
  }

  private middlewares (): void {
    this.express.use(helmet())
    this.express.use(compression())
    if (process.env.APP === 'production') {
      this.express.use(logger('combined'))
    } else {
      this.express.use(logger('dev'))
    }
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(cors())
  }

  private errorHandler (): void {
    this.express.use((req, res, next) => {
      const error = new Error('Route not found.')
      error.status = 404
      next(error)
    })

    this.express.use(
      (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
        console.log(error)
        const status = error.status || 500
        const message = error.message
        res.status(status).json({ message: message, status: status })
      }
    )
  }

  private database (): void {
    mongoose.set('debug', true)
    mongoose.set('useCreateIndex', true)
    mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/tsnode`, {
      useNewUrlParser: true
    })
    mongoose.connection
      .once('open', () => console.log(`connected to databse`))
      .on('error', error => console.warn('error: ' + error))
  }

  private routes (): void {
    this.express.use('/api/v1', routes)
  }
}

export default new App().express
