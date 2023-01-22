import { setupServer } from '../server';
import { setupDatabase } from '../database';
import axios from 'axios';
import chai from 'chai';
import * as dotenv from 'dotenv';

describe('Testes', () => {
  before(async () => {
    console.log('process.env.DATABASE_URL: ', process.env.DATABASE_URL);
    dotenv.config({ path: __dirname + '/../../test.env' });
    console.log('process.env.DATABASE_URL: ', process.env.DATABASE_URL);
    await setupDatabase();
    await setupServer();
  });
  it('query', async () => {
    const url = 'http://localhost:4000/';
    const query = 'query { hello }';
    const response = await axios.post(url, { query });
    console.log(response.data);
    chai.expect(response.data).to.eql({ data: { hello: 'Hello world!' } });
  });
});
