import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ type: 'character varying', length: 80 })
  street: string

  @Column({ type: 'character varying', length: 80 })
  city: string

  @Column({ type: 'character varying', length: 80 })
  state: string

  @Column({ type: 'character varying', length: 80 })
  district: string

  @Column({ type: 'character varying', length: 10 })
  number: string

  @Column({ type: 'character varying', length: 80 })
  complement: string
}
