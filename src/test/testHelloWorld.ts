import { setupServer } from '../server';
import { dropDatabase, setupDatabase, clearDatabase } from '../database';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { expect } from 'chai';

describe('Testing Hello World', () => {
  before(async () => {
    dotenv.config({ path: process.cwd() + '/test.env' });
    await setupDatabase();
    await setupServer();
  });

  it('query hello', async () => {
    const url = 'http://localhost:4000/';
    const query = 'query { hello }';
    const response = await axios.post(url, { query });
    expect(response.data).to.eql({ data: { hello: 'Hello world!' } });
  });

  after(async () => {
    await clearDatabase();
    await dropDatabase();
  });
});
