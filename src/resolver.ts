import { UserInput, LogInputUser } from './user-input';
import { creatingUser, hashPassword } from './creating-user';
import { findUser, findUserById, lastUser, listUsers } from './find-user';
import { CustomError } from './custom-errror';
import { authorize, createToken } from './create-token';

export const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }, context) => {
      const { data } = args;
      const token = context.headers.authorization;
      authorize(token);
      const user = await creatingUser(data);
      return user;
    },
    login: async (_, args: { data: LogInputUser; rememberMe?: boolean }) => {
      const { data, rememberMe } = args;
      const hash = await hashPassword(data.password);
      const user = await findUser(data.user);
      if (user.hash === hash) {
        const token = createToken(user.id, rememberMe);
        return { user, token };
      }
      throw new CustomError('Senha Incorreta', 401);
    },
  },
  Query: {
    user: async (_, args: { id: number }, context) => {
      const { id } = args;
      const token = context.headers.authorization;
      authorize(token);
      const user = await findUserById(id);
      return user;
    },
    users: async (_, args: { userToReturn: number }, context) => {
      let { userToReturn } = args;
      const token = context.headers.authorization;
      authorize(token);
      if (userToReturn == null) {
        userToReturn = (await lastUser()) - 1;
      }
      return await listUsers(userToReturn);
    },
  },
};
