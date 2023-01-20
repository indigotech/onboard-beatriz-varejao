import { UserInput } from './UserInput';
import { User } from './entity/User';
import { AppDataSource } from './data-source';
import { CustomError } from './custom-errror';
import crypto from 'node:crypto';
import { promisify } from 'node:util';

export const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }) => {
      const { data } = args;
      if (data.password.length < 6) {
        throw new CustomError('A senha deve conter pelo menos 6 caracteres', 400);
      }
      if (!isThereALetter(data.password)) {
        throw new CustomError('A senha deve conter pelo menos 1 letra', 400);
      }
      if (isThereANumber(data.password)) {
        throw new CustomError('A senha deve conter pelo menos 1 número', 400);
      }
      const hasEmail = await isEmailAlreadyUsed(data.email);
      if (hasEmail) {
        throw new CustomError('Email já utilizado', 400);
      }
      console.log('Inserting a new user into the database...');
      const user = new User();
      user.name = data.name;
      const funcqueretpromise = promisify(crypto.scrypt);
      const derivedKey = (await funcqueretpromise(data.password, 'salt', 10)) as Buffer;
      user.hash = derivedKey.toString('hex');
      user.email = data.email;
      user.birthDate = data.birthDate;
      await AppDataSource.manager.save(user);
      console.log('Saved a new user with id: ' + user.id);
      return user;
    },
  },
  Query: {
    hello: () => {
      return 'Hello world!';
    },
  },
};

function isThereANumber(str: string) {
  return isNaN(parseFloat(str));
}

function isThereALetter(str: string) {
  const alf = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  let def = false;
  alf.forEach(function (letter) {
    if (str.toLowerCase().includes(letter)) {
      def = true;
    }
  });
  return def;
}

async function isEmailAlreadyUsed(str: string) {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: str,
  });
  return user !== null;
}
