import { setupServer } from '../server';
import { dropDatabase, setupDatabase, clearDatabase } from '../database';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { expect } from 'chai';
import { expectedResponse, userDatabase, queryUserFind, createdUser } from './input';
import { createToken } from '../create-token';
import { lastUser } from '../find-user';

describe('Testing createUser', () => {
  before(async () => {
    dotenv.config({ path: process.cwd() + '/test.env' });
    await setupDatabase();
    await setupServer();
  });
  it('should create an user and return it', async () => {
    const url = 'http://localhost:4000';
    const id = await lastUser();
    const token = createToken(id, true);
    const response = await axios.post(
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
          authorization: token,
        },
      },
    );
    expect(response.data.data.createUser).to.eql(expectedResponse);
    const response2 = await axios.post(url, { query: queryUserFind, variables: { email: 'eu@gmail.com' } });
    expect(response2.data).to.eql(userDatabase);
  });
  it('should the user in the database and return it', async () => {
    const url = 'http://localhost:4000';
    const id = await lastUser();
    const token = createToken(id, true);
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
          authorization: token,
        },
      },
    );
    const response = await axios.post(url, { query: queryUserFind, variables: { email: 'eu@gmail.com' } });
    expect(response.data).to.eql(userDatabase);
  });
  after(async () => {
    await clearDatabase();
    await dropDatabase();
  });
});
