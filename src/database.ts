import { User } from './entity/User';
import { AppDataSource } from './data-source';

export async function setupDatabase() {
  await AppDataSource.setOptions({ url: process.env.DATABASE_URL }).initialize();
  console.log('Database was connected!');
}

export const dropDatabase = async () => {
  await AppDataSource.dropDatabase();
  console.info(`Database Dropped!`);
};

export const clearDatabase = async () => {
  await AppDataSource.getRepository(User).clear();
  console.info(`Database Cleared!`);
};
