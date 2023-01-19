import { UserInput } from './UserInput';
import { User } from './entity/User';
import { AppDataSource } from './data-source';
import { CustomError } from './custom-errror';

export const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }) => {
      const { data } = args;
      if (data.password.length < 6) {
        throw new CustomError('A senha deve conter pelo menos 6 caracteres', 400);
      }
      if (!thereIsLetter(data.password)) {
        throw new CustomError('A senha deve conter pelo menos 1 letra', 400);
      }
      if (thereIsNumber(data.password)) {
        throw new CustomError('A senha deve conter pelo menos 1 número', 400);
      }
      const bool = await emailAlreadyUsed(data.email);
      if (bool) {
        throw new CustomError('Email já utilizado', 400);
      }
      console.log('Inserting a new user into the database...');
      const user = new User();
      user.name = data.name;
      user.password = data.password;
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

function thereIsNumber(str: string) {
  return isNaN(parseFloat(str));
}

function thereIsLetter(str: string) {
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
  alf.forEach(function (letra) {
    if (str.includes(letra)) {
      def = true;
    }
  });
  return def;
}

async function emailAlreadyUsed(str: string) {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: str,
  });
  let def = false;
  if (user != null) {
    def = true;
  }
  return def;
}
