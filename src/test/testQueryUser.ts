import { setupServer } from '../server';
import { dropDatabase, setupDatabase, clearDatabase } from '../database';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { expect } from 'chai';
import { queryUser, expectedResponseUser, userError, userErrorNotFound, createdUser } from './input';
import { createToken } from '../create-token';

describe('Testing Query User', () => {
  before(async () => {
    dotenv.config({ path: process.cwd() + '/test.env' });
    await setupDatabase();
    await setupServer();
  });

  it('should fetch the infos of the first user', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(1, true);
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
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 1 } },
      {
        headers: {
          authorization: token,
        },
      },
    );
    expect(response.data.data.user).to.eql(expectedResponseUser);
  });

  it('should return error User not found', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(2, true);
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 2 } },
      {
        headers: {
          authorization: token,
        },
      },
    );
    expect(response.data.errors).to.eql(userErrorNotFound);
  });

  it('should return error token invalid', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(1, true);
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 1 } },
      {
        headers: {
          authorization: token,
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
  });
});
