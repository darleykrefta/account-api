import { DeleteResult, EntityRepository, getRepository } from 'typeorm'
import { Address } from '../entities/address-entity'

import { Natural } from '../entities/natural-entity'
import { Person } from '../entities/person-entity'

@EntityRepository()
export class NaturalRepository {
  async getById(id: string): Promise<Natural | undefined> {
    const naturalRepository = getRepository(Natural)

    const data = await naturalRepository.findOne({ where: { id }, relations: ['person', 'address'] })

    return data
  }

  async getAll(): Promise<Natural[] | undefined> {
    const naturalRepository = getRepository(Natural)

    const data = await naturalRepository.find({ relations: ['person', 'address'] })

    return data
  }

  async create(natural: Natural): Promise<Natural> {
    const naturalRepository = getRepository(Natural)

    const address = new Address()
    address.street = natural.address.street
    address.district = natural.address.district
    address.city = natural.address.city
    address.state = natural.address.state
    address.complement = natural.address.complement
    address.number = natural.address.number

    const newNatural = new Natural()
    newNatural.cpf = natural.cpf
    newNatural.company_name = natural.company_name

    const person = new Person()
    person.fullname = natural.person.fullname
    newNatural.person = person
    newNatural.address = address

    const responseNatural = naturalRepository.create(newNatural)

    const data = await naturalRepository.save(responseNatural)

    return data
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async update(id: string, natural: Natural): Promise<Natural | {}> {
    const naturalRepository = getRepository(Natural)

    const oldNatural = await naturalRepository.findOne(id)

    if (oldNatural) {
      const updatedNatural = naturalRepository.merge(oldNatural, natural)
      const data = await naturalRepository.save(updatedNatural)
      return data
    }
    return {}
  }

  async delete(id: string): Promise<DeleteResult> {
    const naturalRepository = getRepository(Natural)

    const data = await naturalRepository.delete(id)

    return data
  }
}
