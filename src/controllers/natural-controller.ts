import { Request, Response } from 'express'

import { Natural } from '../entities/natural-entity'

import { NaturalRepository } from '../repositories/natural-repository'

export class NaturalController {
  public async getById(req: Request, res: Response): Promise<Response<Natural, Record<string, Natural>>> {
    const naturalRepository = new NaturalRepository()
    const { id } = req.params
    const data = await naturalRepository.getById(id)
    return res.send(data)
  }

  public async getAll(_: Request, res: Response): Promise<Response<Natural, Record<string, Natural>>> {
    const naturalRepository = new NaturalRepository()
    const data = await naturalRepository.getAll()
    return res.send(data)
  }

  public async create(req: Request, res: Response): Promise<Response<Natural, Record<string, Natural>>> {
    const natural: Natural = req.body
    const naturalRepository = new NaturalRepository()
    const data = await naturalRepository.create(natural)
    return res.send(data)
  }

  public async update(req: Request, res: Response): Promise<Response<Natural, Record<string, Natural>>> {
    const { id } = req.params
    const natural: Natural = req.body
    const naturalRepository = new NaturalRepository()
    const data = await naturalRepository.update(id, natural)
    return res.send(data)
  }

  public async delete(req: Request, res: Response): Promise<Response<Natural, Record<string, Natural>>> {
    const { id } = req.params
    const naturalRepository = new NaturalRepository()
    const data = await naturalRepository.delete(id)
    return res.send(data)
  }
}
