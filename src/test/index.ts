import { setupServer } from '../server';
import { dropDatabase, setupDatabase, clearDatabase } from '../database';
import * as dotenv from 'dotenv';

before(async () => {
  dotenv.config({ path: process.cwd() + '/test.env' });
  await setupDatabase();
  await setupServer();
});
require('./test-create-user');
require('./test-login');
require('./test-query-user');
require('./test-page');

afterEach(async () => {
  await clearDatabase();
});
after(async () => {
  await dropDatabase();
});
