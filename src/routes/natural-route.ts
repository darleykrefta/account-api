import express, { Router } from 'express'
import { NaturalController } from '../controllers/natural-controller'

export class NaturalRouter {
  private naturalController: NaturalController
  public route: Router

  constructor() {
    this.naturalController = new NaturalController()
    this.route = express.Router()
    this.routes()
  }

  public routes(): void {
    this.route.get('/', this.naturalController.getAll)
    this.route.get('/:id', this.naturalController.getById)
    this.route.post('/', this.naturalController.create)
    this.route.put('/:id', this.naturalController.update)
    this.route.delete('/:id', this.naturalController.delete)
  }
}
