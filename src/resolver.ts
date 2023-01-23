import { UserInput } from './UserInput';
import { creatingUser } from './creating-user';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

export const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }) => {
      const { data } = args;
      const user = await creatingUser(data);
      return user;
    },
  },
  Query: {
    hello: () => {
      return 'Hello world!';
    },
    findUser: async (_, args: { id: number }) => {
      const { id } = args;
      const firstUser = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .getOne();
      return firstUser;
    },
  },
};
