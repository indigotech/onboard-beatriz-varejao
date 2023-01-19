import { setupDatabase } from './database';
import { setupServer } from './server';

setupGeneral();

async function setupGeneral() {
  await setupDatabase();
  await setupServer();
}
