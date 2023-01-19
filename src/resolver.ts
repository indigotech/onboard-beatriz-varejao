import { UserInput } from './UserInput';
import { User } from './entity/User';
import { AppDataSource } from './data-source';

export const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }) => {
      const { data } = args;
      console.log('Inserting a new user into the database...');
      const user = new User();
      user.name = data.name;
      user.password = data.password;
      user.email = data.email;
      user.birthDate = data.birthDate;
      await AppDataSource.manager.save(user);
      console.log('Saved a new user with id: ' + user.id);
      return { id: user.id, email: user.email, name: user.name, birthDate: user.birthDate };
    },
  },
  Query: {
    hello: () => {
      return 'Hello world!';
    },
  },
};
