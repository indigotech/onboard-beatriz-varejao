import { Adress } from './entity/Adress';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, Adress],
});
