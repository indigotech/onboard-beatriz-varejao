import { setupServer } from '../server';
import { clearDatabase, setupDatabase } from '../database';
import axios from 'axios';
import { expect } from 'chai';
import * as dotenv from 'dotenv';
import { user1, expectedResponse, queryUser, userDatabase, mutlogin } from './input';
import { authorize } from '../create-token';

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
    expect(response.data).to.eql({ data: { hello: 'Hello world!' } });
  });
  it('should create an user and return it', async () => {
    const url = 'http://localhost:4000';
    const response = await axios.post(
      url,
      { query: user1 },
      {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTY3NTAzOTU4MywiZXhwIjoxNjc1NjQ0MzgzfQ.R-wm6pGfw4JazTkSysVALdUAGV_sSxuH42xpjloh_7E',
        },
      },
    );
    expect(response.data.data.createUser).to.eql(expectedResponse);
    const response2 = await axios.post(url, { query: queryUser });
    expect(response2.data).to.eql(userDatabase);
  });
  it('should return a login user', async () => {
    const url = 'http://localhost:4000';
    const response = await axios.post(url, { query: mutlogin });
    expect(response.data.data.login.user).to.eql(expectedResponse);
    expect(authorize(response.data.data.login.token, 1)).to.eql(undefined);
  });
  it('should create an user and return it', async () => {
    const url = 'http://localhost:4000';
    const response = await axios.post(
      url,
      { query: queryUser },
      {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTY3NTAzOTU4MywiZXhwIjoxNjc1NjQ0MzgzfQ.R-wm6pGfw4JazTkSysVALdUAGV_sSxuH42xpjloh_7E',
        },
      },
    );
    expect(response.data.data.user).to.eql(expectedResponse);
  });
  after(async () => {
    await clearDatabase();
  });
});
