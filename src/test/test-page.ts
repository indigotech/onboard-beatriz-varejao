import axios from 'axios';
import { expect } from 'chai';
import { createdUser, queryUsers, expectedUsersNull } from './input';
import { createToken } from '../create-token';
import { lastUser } from '../find-user';

describe('Testing Query Users', () => {
  it.only('should return the infos of the 2 first users', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(0, true);
    const total = (await lastUser()) - 1;
    for (let i = 0; i < 5; i++) {
      const skip = i * 10;
      const limit = 10;
      const response = await axios.post(
        url,
        { query: queryUsers, variables: { skip, limit } },
        {
          headers: {
            authorization: token,
          },
        },
      );
      expect(response.data.data.users.before).to.be.eql(skip);
      expect(response.data.data.users.total).to.be.eql(total);
      expect(response.data.data.users.after).to.be.eql(40 - skip);
      expect(response.data.data.users.users.length).to.be.eql(10);
    }
  });
  it('should return the infos of all users in the database', async () => {
    const url = 'http://localhost:4000';
    let token = createToken(1, true);
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
    token = createToken(2, true);
    await axios.post(
      url,
      {
        query: createdUser,
        variables: {
          user: {
            name: 'bia',
            email: 'bia@gmail.com',
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
    token = createToken(0, true);
    const response = await axios.post(
      url,
      { query: queryUsers },
      {
        headers: {
          authorization: token,
        },
      },
    );
    expect(response.data.data.users).to.be.eql(expectedUsersNull);
  });
});
