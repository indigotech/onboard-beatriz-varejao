import { UserInput, LogInputUser } from './user-input';
import { creatingUser, hashPassword } from './creating-user';
import { findUser, findUserById, listUsers, countUsers } from './find-user';
import { CustomError } from './custom-errror';
import { authorize, createToken } from './create-token';
import { AdressInput } from './Adress';
import { AppDataSource } from './data-source';
import { Adress } from './entity/Adress';

export const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }, context) => {
      const { data } = args;
      const token = context.headers.authorization;
      authorize(token);
      const user = await creatingUser(data);
      return user;
    },
    createAdress: async (_, args: { adress: AdressInput; username: string }) => {
      const { adress, username } = args;
      const user = await findUser(username);
      const adressData = new Adress();
      adressData.CEP = adress.CEP;
      adressData.Complement = adress.Complement;
      adressData.City = adress.City;
      adressData.Neighborhood = adress.Neighborhood;
      adressData.State = adress.State;
      adressData.Street = adress.Street;
      adressData.StreetNumber = adress.StreetNumber;
      adressData.user = user;
      await AppDataSource.manager.save(adressData);
      console.log(user.adress);
      if (user.adress == undefined) {
        console.log('ok');
        user.adress = [adressData];
        console.log(user.adress);
      } else user.adress.concat([adressData]);
      console.log('Saved a new adress' + adressData.id);
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
      console.log('user adress', user.adress);
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
