import { AppDataSource } from './data-source';

export async function setupDatabase() {
  await AppDataSource.setOptions({ url: process.env.DATABASE_URL }).initialize();
  console.log('Database was connected!');
}

export const clearDatabase = async () => {
  await AppDataSource.dropDatabase();
  console.info(`Database Cleared!`);
};
