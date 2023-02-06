import { UserInput } from './UserInput';
import { creatingUser, hashPassword } from './creating-user';
import { LogInputUser } from './log-user';
import { findingUser, findUserById, lastUser } from './find-user';
import { CustomError } from './custom-errror';
import { authorize, createToken } from './create-token';

export const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }, context) => {
      const { data } = args;
      const headers = context;
      const token = headers.headers.authorization;
      const id = await lastUser();
      authorize(token, id);
      const user = await creatingUser(data);
      return user;
    },
    login: async (_, args: { data: LogInputUser; rememberMe?: boolean }) => {
      const { data, rememberMe } = args;
      const hash = await hashPassword(data.password);
      const user = await findingUser(data.user);
      if (user.hash === hash) {
        const token = createToken(user.id, rememberMe);
        return { user, token };
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
    user: async (_, args: { id: number }, context) => {
      const { id } = args;
      const headers = context;
      const token = headers.headers.authorization;
      authorize(token, id);
      const user = await findUserById(id);
      return user;
    },
  },
};
