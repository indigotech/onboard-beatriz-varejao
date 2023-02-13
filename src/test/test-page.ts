import { expect } from 'chai';
import { queryUsers, queryBase } from './input';
import { createToken } from '../create-token';
import { count } from '../find-user';
import { seedUser } from '../seedex';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

describe('Testing Query Users', () => {
  it('should return the infos of all users in the database', async () => {
    await seedUser(50);
    const token = createToken(0, true);
    const total = await count();
    for (let i = 0; i < 5; i++) {
      const skip = i * 10;
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
      ),
        expect(response.data.data.users.users.length).to.be.eql(10);
    }
  });
});
