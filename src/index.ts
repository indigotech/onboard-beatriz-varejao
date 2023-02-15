import { setupDatabase } from './database';
import { setupServer } from './server';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + '/.env' });
setupGeneral();

export async function setupGeneral() {
  await setupDatabase();
  await setupServer();
}
