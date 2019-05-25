import http from 'http'
import app from './app'

const server = http.createServer(app)

server.listen(
  process.env.PORT,
  (): void => {
    console.log(`listening on port ${process.env.PORT}`)
  }
)
