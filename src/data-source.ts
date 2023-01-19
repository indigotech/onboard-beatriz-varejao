import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'euzinha12',
  password: 'abc123',
  database: 'local',
  synchronize: true,
  logging: false,
  entities: [User],
  dropSchema: false,
});
