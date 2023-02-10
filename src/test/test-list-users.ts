import { expect } from 'chai';
import { createRepositoryUser, queryBase, queryUsers } from './input';
import { createToken } from '../create-token';
import { findUser } from '../find-user';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

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
    const variables = { limit: 2 };
    const response = await queryBase(queryUsers, variables, token);
    const users = await AppDataSource.getRepository(User).find({ order: { name: 'ASC' } });
    expect(response.data.data.users).to.be.deep.eq(
      users.map((user) => ({
        id: `${user.id}`,
        email: user.email,
        name: user.name,
        birthDate: user.birthDate,
      })),
    );
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
    const variables = { limit: 3 };
    const response = await queryBase(queryUsers, variables, token);
    const users = await AppDataSource.getRepository(User).find({ order: { name: 'ASC' } });
    expect(response.data.data.users).to.be.deep.eq(
      users.map((user) => ({
        id: `${user.id}`,
        email: user.email,
        name: user.name,
        birthDate: user.birthDate,
      })),
    );
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
    const variables = { limit: undefined };
    const response = await queryBase(queryUsers, variables, token);
    const user = await findUser(input.email);
    expect(response.data.data.users).to.be.deep.eq([
      {
        birthDate: user.birthDate,
        email: user.email,
        id: `${user.id}`,
        name: user.name,
      },
    ]);
  });
});
