import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'

import { Address } from './address-entity'
import { Person } from './person-entity'

@Entity()
export class Natural {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ unique: true, type: 'character varying', length: 11 })
  cpf: string

  @Column({ type: 'character varying', length: 80 })
  company_name: string

  @OneToOne(() => Person, { cascade: ['insert', 'update'] })
  @JoinColumn()
  person: Person

  @OneToOne(() => Address, { cascade: ['insert', 'update'] })
  @JoinColumn()
  address: Address
}
