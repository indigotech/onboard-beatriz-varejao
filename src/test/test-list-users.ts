import axios from 'axios';
import { expect } from 'chai';
import { createRepositoryUser, queryUsers } from './input';
import { createToken } from '../create-token';
import { findUser } from '../find-user';

describe('Testing Query Users', () => {
  it('should return the infos of the 2 first users', async () => {
    const url = 'http://localhost:4000';
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    const input2 = {
      name: 'bia',
      email: 'bia@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    await createRepositoryUser(input);
    await createRepositoryUser(input2);
    const token = createToken(0, true);
    const response = await axios.post(
      url,
      { query: queryUsers, variables: { limit: 2 } },
      {
        headers: {
          authorization: token,
        },
      },
    );
    const user = await findUser(input.email);
    const id = `${user.id}`;
    const user2 = await findUser(input2.email);
    const id2 = `${user.id}`;
    expect(response.data.data.login.user).to.be.deep.eq([
      {
        birthDate: user.birthDate,
        email: user.email,
        id,
        name: input.name,
      },
      {
        birthDate: user2.birthDate,
        email: user2.email,
        id2,
        name: input2.name,
      },
    ]);
  });
});
