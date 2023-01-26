import { UserInput } from './UserInput';
import { creatingUser, hashPassword } from './creating-user';
import { LogInputUser, LogOutUser } from './log-user';
import { findingUser } from './find-user';
import { CustomError } from './custom-errror';

export const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }) => {
      const { data } = args;
      const user = await creatingUser(data);
      return user;
    },
    login: async (_, args: { data: LogInputUser }) => {
      const { data } = args;
      const hash = await hashPassword(data.password);
      const user = await findingUser(data.user);
      if (user.hash === hash) {
        return new LogOutUser(user, 'meutoken');
      }
      throw new CustomError('Senha Incorreta', 410);
    },
  },
  Query: {
    hello: () => {
      return 'Hello world!';
    },
    findUser: async (_, args: { email: string }) => {
      const { email } = args;
      return await findingUser(email);
    },
  },
};
