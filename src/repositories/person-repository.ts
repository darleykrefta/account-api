import { DeleteResult, EntityRepository, getRepository } from 'typeorm'

import { Person } from '../entities/person-entity'

@EntityRepository()
export class PersonRepository {
  async getById(id: string): Promise<Person | undefined> {
    const personRepository = getRepository(Person)

    const data = await personRepository.findOne({ where: { id } })

    return data
  }

  async getAll(): Promise<Person[] | undefined> {
    const personRepository = getRepository(Person)

    const data = await personRepository.find()

    return data
  }

  async create(person: Person): Promise<Person> {
    const personRepository = getRepository(Person)

    const newPerson = personRepository.create(person)

    const data = await personRepository.save(newPerson)

    return data
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async update(id: string, person: Person): Promise<Person | {}> {
    const personRepository = getRepository(Person)

    const oldPerson = await personRepository.findOne(id)

    if (oldPerson) {
      const updatedPerson = personRepository.merge(oldPerson, person)
      const data = await personRepository.save(updatedPerson)
      return data
    }
    return {}
  }

  async delete(id: string): Promise<DeleteResult> {
    const personRepository = getRepository(Person)

    const data = await personRepository.delete(id)

    return data
  }
}
