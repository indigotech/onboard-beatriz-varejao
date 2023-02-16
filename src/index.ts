import { setupDatabase } from './database';
import { setupServer } from './server';
import * as dotenv from 'dotenv';

dotenv.config();
setupGeneral();

export async function setupGeneral() {
  await setupDatabase();
  await setupServer();
}
