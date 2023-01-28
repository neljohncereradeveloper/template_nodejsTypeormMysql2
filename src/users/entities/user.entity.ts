import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 })
  firstName: string;

  @Column('varchar', { length: 20, nullable: true })
  middleName: string;

  @Column('varchar', { length: 20 })
  lastName: string;

  @Column('int')
  age: number;
}
