import 'reflect-metadata'

import { Connection, createConnection } from 'typeorm'
import express, { Application } from 'express'
import dotenv from 'dotenv'

import { NaturalRouter } from './routes/natural-route'
import { LegalRouter } from './routes/legal-route'

import { handleErrors } from './middlewares/handleError'

class Server {
  private app: Application
  private conn: Connection
  private naturalRouter: NaturalRouter
  private legalRouter: LegalRouter

  constructor() {
    dotenv.config()
    this.app = express()
    this.routes()
    this.middlewares()
  }

  routes() {
    this.naturalRouter = new NaturalRouter()
    this.naturalRouter.routes()
    this.app.use('/api/natural', this.naturalRouter.route)

    this.legalRouter = new LegalRouter()
    this.legalRouter.routes()
    this.app.use('/api/legal', this.legalRouter.route)
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(handleErrors)
  }

  async db() {
    this.conn = await createConnection()
    return this.conn
  }

  start() {
    this.db()
      .then(async () => {
        const APP_PORT = process.env.APP_PORT

        this.app.listen(APP_PORT, () => console.info(`App listening on PORT ${APP_PORT}`))
      })
      .catch((err) => console.error(err))
  }
}

const server = new Server()

server.start()
