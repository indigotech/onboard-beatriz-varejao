import { AppDataSource } from './data-source';

export async function setupDatabase() {
  await AppDataSource.initialize();
  console.log('Database was connected!');
}
