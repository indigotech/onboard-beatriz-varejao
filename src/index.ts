import { setupDatabase } from './database';
import { setupServer } from './server';

setupgeral();

async function setupgeral() {
  await setupDatabase();
  await setupServer();
}
