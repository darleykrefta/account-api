import express, { Router } from 'express'

import { LegalController } from '../controllers/legal-controller'

export class LegalRouter {
  private legalController: LegalController
  public route: Router

  constructor() {
    this.legalController = new LegalController()
    this.route = express.Router()
    this.routes()
  }

  public routes(): void {
    this.route.get('/', this.legalController.getAll)
    this.route.get('/:id', this.legalController.getById)
    this.route.post('/', this.legalController.create)
    this.route.put('/:id', this.legalController.update)
    this.route.delete('/:id', this.legalController.delete)
  }
}
