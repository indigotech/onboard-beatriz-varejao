import { setupServer } from '../server';
<<<<<<< HEAD
import { clearDatabase, setupDatabase } from '../database';
import axios from 'axios';
import { expect } from 'chai';
import * as dotenv from 'dotenv';
import { user1, expectedResponse, queryUser, userDatabase } from './input';

describe('Testes', () => {
=======
import { dropDatabase, setupDatabase, clearDatabase } from '../database';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { expect } from 'chai';
import { queryUser, expectedResponseUser, userError, userErrorNotFound, createdUser } from './input';

describe('Testing Query User', () => {
>>>>>>> 7ee399b (environment setup)
  before(async () => {
    dotenv.config({ path: process.cwd() + '/test.env' });
    await setupDatabase();
    await setupServer();
  });
<<<<<<< HEAD
  it('should return Hello World', async () => {
    const url = 'http://localhost:4000/';
    const query = 'query { hello }';
    const response = await axios.post(url, { query });
    expect(response.data).to.eql({ data: { hello: 'Hello world!' } });
  });
  it('creating user', async () => {
    const url = 'http://localhost:4000';
    const response = await axios.post(url, { query: user1 });
    expect(response.data).to.eql(expectedResponse);
  });
  it('checking database', async () => {
    const url = 'http://localhost:4000';
    const response = await axios.post(url, { query: queryUser });
    expect(response.data).to.eql(userDatabase);
  });
  after(async () => {
    await clearDatabase();
=======
  it('should fetch the infos of the first user', async () => {
    const url = 'http://localhost:4000';
    await axios.post(
      url,
      {
        query: createdUser,
        variables: {
          user: {
            name: 'eu',
            email: 'eu@gmail.com',
            birthDate: '27/12/1900',
            password: 'mudar123',
          },
        },
      },
      {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTY3NTAzOTU4MywiZXhwIjoxNjc1NjQ0MzgzfQ.R-wm6pGfw4JazTkSysVALdUAGV_sSxuH42xpjloh_7E',
        },
      },
    );
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 1 } },
      {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTY3NTAzOTU4MywiZXhwIjoxNjc1NjQ0MzgzfQ.R-wm6pGfw4JazTkSysVALdUAGV_sSxuH42xpjloh_7E',
        },
      },
    );
    expect(response.data.data.user).to.eql(expectedResponseUser);
  });
  it('should return error User not found', async () => {
    const url = 'http://localhost:4000';
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 2 } },
      {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsImlhdCI6MTY3NTEwMTc1OSwiZXhwIjoxNjc1MTg4MTU5fQ.fBi0XXEXgfyChjh4_NU01bWoemJCAv_1lYCcqjB7e6o',
        },
      },
    );
    expect(response.data.errors).to.eql(userErrorNotFound);
  });
  it('should return error token invalid', async () => {
    const url = 'http://localhost:4000';
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 1 } },
      {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTY3NTEwMTI5OCwiZXhwIjoxNjc1MTg3Njk4fQ.A1fbvMu-_d3CLXf3Aa0rWnlBCjCOi-V21RzQJ6bpKyA',
        },
      },
    );
    expect(response.data.errors).to.eql(userError);
  });
  afterEach(async () => {
    await clearDatabase();
  });
  after(async () => {
    await dropDatabase();
>>>>>>> 7ee399b (environment setup)
  });
});
