import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Address } from './address-entity'

import { Person } from './person-entity'

@Entity()
export class Legal {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ unique: true, type: 'character varying', length: 14 })
  cnpj: string

  @Column({ type: 'character varying', length: 80 })
  company_name: string

  @Column({ type: 'character varying', length: 80 })
  corporate_name: string

  @Column({ type: 'character varying', length: 20 })
  ie: string

  @OneToOne(() => Person, { cascade: ['insert', 'update'] })
  @JoinColumn()
  person: Person

  @OneToOne(() => Address, { cascade: ['insert', 'update'] })
  @JoinColumn()
  address: Address
}
