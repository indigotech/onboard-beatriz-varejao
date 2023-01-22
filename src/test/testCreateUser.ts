import { setupServer } from '../server';
import { dropDatabase, setupDatabase, clearDatabase } from '../database';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { expect } from 'chai';
import { expectedResponse, userDatabase, queryUserFind, createdUser } from './input';

describe('Testing createUser', () => {
  before(async () => {
    dotenv.config({ path: process.cwd() + '/test.env' });
    await setupDatabase();
    await setupServer();
  });
  it('should create an user and return it', async () => {
    const url = 'http://localhost:4000';
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
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTY3NTAzOTU4MywiZXhwIjoxNjc1NjQ0MzgzfQ.R-wm6pGfw4JazTkSysVALdUAGV_sSxuH42xpjloh_7E',
        },
      },
    );
    expect(response.data.data.createUser).to.eql(expectedResponse);
    const response2 = await axios.post(url, { query: queryUserFind, variables: { email: 'eu@gmail.com' } });
    expect(response2.data).to.eql(userDatabase);
  });
  after(async () => {
    await clearDatabase();
    await dropDatabase();
  });
});
