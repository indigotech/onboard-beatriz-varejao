import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Adress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CEP: string;

  @Column()
  Street: string;

  @Column()
  StreetNumber: string;

  @Column()
  Complement: string;

  @Column()
  Neighborhood: string;

  @Column()
  City: string;

  @Column()
  State: string;

  @ManyToOne(() => User, (user) => user.adress, { cascade: true, onDelete: 'CASCADE' })
  user: User;
}
