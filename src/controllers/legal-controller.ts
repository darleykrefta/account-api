import { NextFunction, Request, Response } from 'express'

import { Legal } from '../entities/legal-entity'

import { LegalRepository } from '../repositories/legal-repository'

export class LegalController {
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Legal, Record<string, Legal>> | void> {
    try {
      const legalRepository = new LegalRepository()
      const { id } = req.params
      const data = await legalRepository.getById(id)
      return res.send(data)
    } catch (err) {
      return next(err)
    }
  }

  public async getAll(_: Request, res: Response): Promise<Response<Legal, Record<string, Legal>>> {
    const legalRepository = new LegalRepository()
    const data = await legalRepository.getAll()
    return res.send(data)
  }

  public async create(req: Request, res: Response): Promise<Response<Legal, Record<string, Legal>>> {
    const legal: Legal = req.body
    const legalRepository = new LegalRepository()
    const data = await legalRepository.create(legal)
    return res.send(data)
  }

  public async update(req: Request, res: Response): Promise<Response<Legal, Record<string, Legal>>> {
    const { id } = req.params
    const legal: Legal = req.body
    const legalRepository = new LegalRepository()
    const data = await legalRepository.update(id, legal)
    return res.send(data)
  }

  public async delete(req: Request, res: Response): Promise<Response<Legal, Record<string, Legal>>> {
    const { id } = req.params
    const legalRepository = new LegalRepository()
    const data = await legalRepository.delete(id)
    return res.send(data)
  }
}
