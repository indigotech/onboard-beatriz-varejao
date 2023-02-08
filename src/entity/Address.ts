import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CEP: string;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @ManyToOne(() => User, (user) => user.address, { cascade: true, onDelete: 'CASCADE' })
  user: User;
}
