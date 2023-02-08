import { setupServer } from '../server';
import { dropDatabase, setupDatabase, clearDatabase } from '../database';
import * as dotenv from 'dotenv';

before(async () => {
  dotenv.config({ path: process.cwd() + '/test.env' });
  await setupDatabase();
  await setupServer();
});
require('./testLogin');
