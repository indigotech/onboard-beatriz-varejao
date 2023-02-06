import { setupServer } from '../server';
import { dropDatabase, setupDatabase, clearDatabase } from '../database';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { expect } from 'chai';
import { expectedResponse, mutlogin, createdUser } from './input';
import { authorize, createToken } from '../create-token';
import { lastUser } from '../find-user';

describe('Testing Login', () => {
  before(async () => {
    dotenv.config({ path: process.cwd() + '/test.env' });
    await setupDatabase();
    await setupServer();
  });

  it('should return a login user', async () => {
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
    const response = await axios.post(url, {
      query: mutlogin,
      variables: {
        user: {
          user: 'eu@gmail.com',
          password: 'mudar123',
        },
      },
    });
    expect(response.data.data.login.user).to.eql(expectedResponse);
    expect(authorize(response.data.data.login.token, 1)).to.eql(undefined);
  });

  after(async () => {
    await clearDatabase();
    await dropDatabase();
  });
});
