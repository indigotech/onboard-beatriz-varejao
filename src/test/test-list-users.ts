import { expect } from 'chai';
import { createRepositoryUser, queryBaseUsersList, queryUsers } from './input';
import { createToken } from '../create-token';
import { findUser } from '../find-user';

describe('Testing Query Users', () => {
  it('should return the infos of the 2 first users', async () => {
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
    const response = await queryBaseUsersList(queryUsers, 2, token);
    const user = await findUser(input2.email);
    const id = `${user.id}`;
    const user2 = await findUser(input.email);
    const id2 = `${user2.id}`;
    expect(response.data.data.users).to.be.deep.eq([
      {
        birthDate: user.birthDate,
        email: user.email,
        id,
        name: user.name,
      },
      {
        birthDate: user2.birthDate,
        email: user2.email,
        id: id2,
        name: user2.name,
      },
    ]);
  });

  it('should return the infos of the 2 users in the database', async () => {
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
    const response = await queryBaseUsersList(queryUsers, 3, token);
    const user = await findUser(input2.email);
    const id = `${user.id}`;
    const user2 = await findUser(input.email);
    const id2 = `${user2.id}`;
    expect(response.data.data.users).to.be.deep.eq([
      {
        birthDate: user.birthDate,
        email: user.email,
        id,
        name: user.name,
      },
      {
        birthDate: user2.birthDate,
        email: user2.email,
        id: id2,
        name: user2.name,
      },
    ]);
  });

  it('should return the infos of all the users in the database', async () => {
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    await createRepositoryUser(input);
    const token = createToken(0, true);
    const response = await queryBaseUsersList(queryUsers, undefined, token);
    const user = await findUser(input.email);
    const id = `${user.id}`;
    expect(response.data.data.users).to.be.deep.eq([
      {
        birthDate: user.birthDate,
        email: user.email,
        id: id,
        name: user.name,
      },
    ]);
  });
});
