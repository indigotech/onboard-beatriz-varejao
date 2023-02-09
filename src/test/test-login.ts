import axios from 'axios';
import { expect } from 'chai';
import { mutlogin, createdUser, expectResponse } from './input';
import { authorize, createToken } from '../create-token';
import { lastUser, findUser } from '../find-user';

describe('Testing Login', () => {
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
    const response2 = await findUser('eu@gmail.com');
    expect(response.data.data.login.user).to.eql(expectResponse(response2.id, false));
    expect(authorize(response.data.data.login.token)).to.eql(undefined);
  });
});
