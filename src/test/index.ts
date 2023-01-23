import { setupServer } from '../server';
import { clearDatabase, setupDatabase } from '../database';
import axios from 'axios';
import chai from 'chai';
import * as dotenv from 'dotenv';
import { user1, expectedResponse, queryUser, userDatabase } from './input';

describe('Testes', () => {
  before(async () => {
    dotenv.config({ path: process.cwd() + '/test.env' });
    await setupDatabase();
    await setupServer();
  });
  it('query hello', async () => {
    const url = 'http://localhost:4000/';
    const query = 'query { hello }';
    const response = await axios.post(url, { query });
    chai.expect(response.data).to.eql({ data: { hello: 'Hello world!' } });
  });
  it('creating user', async () => {
    const url = 'http://localhost:4000';
    const response = await axios.post(url, { query: user1 });
    chai.expect(response.data).to.eql(expectedResponse);
  });
  it('checking database', async () => {
    const url = 'http://localhost:4000';
    const response = await axios.post(url, { query: queryUser });
    chai.expect(response.data).to.eql(userDatabase);
  });
  after(async () => {
    await clearDatabase();
  });
});
