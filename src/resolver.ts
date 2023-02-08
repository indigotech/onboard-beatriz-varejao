import { UserInput, LogInputUser } from './user-input';
import { creatingUser, hashPassword } from './creating-user';
import { findUser, findUserById, listUsers, countUsers } from './find-user';
import { CustomError } from './custom-errror';
import { authorize, createToken } from './create-token';
import { AddressInput } from './address';
import { AppDataSource } from './data-source';
import { Address } from './entity/Address';

export const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }, context) => {
      const { data } = args;
      const token = context.headers.authorization;
      authorize(token);
      const user = await creatingUser(data);
      return user;
    },
    createAddress: async (_, args: { adress: AddressInput; username: string }) => {
      const { adress, username } = args;
      const user = await findUser(username);
      const adressData = new Address();
      adressData.CEP = adress.CEP;
      adressData.complement = adress.complement;
      adressData.city = adress.city;
      adressData.neighborhood = adress.neighborhood;
      adressData.state = adress.state;
      adressData.street = adress.street;
      adressData.streetNumber = adress.streetNumber;
      adressData.user = user;
      await AppDataSource.manager.save(adressData);
      user.address.concat([adressData]);
      console.log('Saved a new adress with id: ' + adressData.id);
      return adressData;
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
    users: async (_, args: { before: number; limit: number }, context) => {
      const { before, limit } = args;
      const token = context.headers.authorization;
      authorize(token);
      const users = await listUsers(before, limit);
      const total = await countUsers();
      const after = total - before - users.length;
      return { users, total, before, after };
    },
  },
};
