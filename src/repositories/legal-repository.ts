import { DeleteResult, EntityRepository, getRepository } from 'typeorm'
import { Address } from '../entities/address-entity'

import { Legal } from '../entities/legal-entity'
import { Person } from '../entities/person-entity'

@EntityRepository()
export class LegalRepository {
  async getById(id: string): Promise<Legal | undefined> {
    const legalRepository = getRepository(Legal)

    const data = await legalRepository.findOne({ where: { id }, relations: ['person', 'address'] })

    return data
  }

  async getAll(): Promise<Legal[] | undefined> {
    const legalRepository = getRepository(Legal)

    const data = await legalRepository.find({ relations: ['person', 'address'] })

    return data
  }

  async create(legal: Legal): Promise<Legal> {
    const legalRepository = getRepository(Legal)

    const address = new Address()
    address.street = legal.address.street
    address.district = legal.address.district
    address.city = legal.address.city
    address.state = legal.address.state
    address.complement = legal.address.complement
    address.number = legal.address.number

    const newLegal = new Legal()
    newLegal.cnpj = legal.cnpj
    newLegal.company_name = legal.company_name

    const person = new Person()
    person.fullname = legal.person.fullname
    newLegal.person = person
    newLegal.address = address

    const responseLegal = legalRepository.create(newLegal)

    const data = await legalRepository.save(responseLegal)

    return data
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async update(id: string, legal: Legal): Promise<Legal | {}> {
    const legalRepository = getRepository(Legal)

    const oldLegal = await legalRepository.findOne(id)

    if (oldLegal) {
      const updatedLegal = legalRepository.merge(oldLegal, legal)
      const data = await legalRepository.save(updatedLegal)
      return data
    }
    return {}
  }

  async delete(id: string): Promise<DeleteResult> {
    const legalRepository = getRepository(Legal)

    const data = await legalRepository.delete(id)

    return data
  }
}
