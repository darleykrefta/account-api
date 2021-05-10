import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ type: 'character varying', length: 80 })
  fullname: string
}
