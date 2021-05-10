import { DeleteResult, EntityRepository, getRepository } from 'typeorm'

import { Address } from '../entities/address-entity'

@EntityRepository()
export class AddressRepository {
  async getById(id: string): Promise<Address | undefined> {
    const addressRepository = getRepository(Address)

    const data = await addressRepository.findOne({ where: { id } })

    return data
  }

  async getAll(): Promise<Address[] | undefined> {
    const addressRepository = getRepository(Address)

    const data = await addressRepository.find()

    return data
  }

  async create(address: Address): Promise<Address> {
    const addressRepository = getRepository(Address)

    const newAddress = addressRepository.create(address)

    const data = await addressRepository.save(newAddress)

    return data
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async update(id: string, address: Address): Promise<Address | {}> {
    const addressRepository = getRepository(Address)

    const oldAddress = await addressRepository.findOne(id)

    if (oldAddress) {
      const updatedAddress = addressRepository.merge(oldAddress, address)
      const data = await addressRepository.save(updatedAddress)
      return data
    }
    return {}
  }

  async delete(id: string): Promise<DeleteResult> {
    const addressRepository = getRepository(Address)

    const data = await addressRepository.delete(id)

    return data
  }
}
