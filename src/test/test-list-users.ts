import { expect } from 'chai';
import { queryUsers, queryBase } from './input';
import { createToken } from '../create-token';
import { countUsers } from '../find-user';
import { seedUser } from '../seedex';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

describe('Testing Query Users', () => {
  it('should return the infos of all users in the databasethe first 10 users', async () => {
    await seedUser(50);
    const token = createToken(0, true);
    const total = await countUsers();
    const skip = 0;
    const limit = 10;
    const variables = { skip, limit };
    const response = await queryBase(queryUsers, variables, token);
    expect(response.data.data.users.before).to.be.eql(skip);
    expect(response.data.data.users.total).to.be.eql(total);
    expect(response.data.data.users.after).to.be.eql(40 - skip);
    const users = await AppDataSource.getRepository(User).find({ order: { name: 'ASC' }, take: 10, skip: skip });
    expect(response.data.data.users.users).to.be.deep.eq(
      users.map((user) => ({
        id: `${user.id}`,
        email: user.email,
        name: user.name,
        birthDate: user.birthDate,
      })),
    );
    expect(response.data.data.users.users.length).to.be.eql(10);
  });

  it('should return the infos of the 10 users in the middle of the database', async () => {
    await seedUser(50);
    const token = createToken(0, true);
    const total = await countUsers();
    const skip = 20;
    const limit = 10;
    const variables = { skip, limit };
    const response = await queryBase(queryUsers, variables, token);
    expect(response.data.data.users.before).to.be.eql(skip);
    expect(response.data.data.users.total).to.be.eql(total);
    expect(response.data.data.users.after).to.be.eql(40 - skip);
    const users = await AppDataSource.getRepository(User).find({ order: { name: 'ASC' }, take: 10, skip: skip });
    expect(response.data.data.users.users).to.be.deep.eq(
      users.map((user) => ({
        id: `${user.id}`,
        email: user.email,
        name: user.name,
        birthDate: user.birthDate,
      })),
    );
    expect(response.data.data.users.users.length).to.be.eql(10);
  });

  it('should return the infos of the 10 last users of the database', async () => {
    await seedUser(50);
    const token = createToken(0, true);
    const total = await countUsers();
    const skip = 40;
    const limit = 10;
    const variables = { skip, limit };
    const response = await queryBase(queryUsers, variables, token);
    expect(response.data.data.users.before).to.be.eql(skip);
    expect(response.data.data.users.total).to.be.eql(total);
    expect(response.data.data.users.after).to.be.eql(40 - skip);
    const users = await AppDataSource.getRepository(User).find({ order: { name: 'ASC' }, take: 10, skip: skip });
    expect(response.data.data.users.users).to.be.deep.eq(
      users.map((user) => ({
        id: `${user.id}`,
        email: user.email,
        name: user.name,
        birthDate: user.birthDate,
      })),
    );
    expect(response.data.data.users.users.length).to.be.eql(10);
  });

  it('should return no user', async () => {
    await seedUser(50);
    const token = createToken(0, true);
    const total = await countUsers();
    const skip = 50;
    const limit = 10;
    const variables = { skip, limit };
    const response = await queryBase(queryUsers, variables, token);
    expect(response.data.data.users.before).to.be.eql(skip);
    expect(response.data.data.users.total).to.be.eql(total);
    expect(response.data.data.users.after).to.be.eql(0);
    expect(response.data.data.users.users).to.be.deep.eq([]);
  });
});
