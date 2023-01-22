import { setupDatabase } from './database';
import { setupServer } from './server';

setupGeneral();

export async function setupGeneral() {
  await setupDatabase();
  await setupServer();
}
