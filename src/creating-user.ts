import { UserInput } from './UserInput';
import { User } from './entity/User';
import { AppDataSource } from './data-source';
import { CustomError } from './custom-errror';
import crypto from 'node:crypto';
import { promisify } from 'node:util';

export async function creatingUser(data: UserInput) {
  if (data.password.length < 6) {
    throw new CustomError('A senha deve conter pelo menos 6 caracteres', 400);
  }
  if (!isThereALetter(data.password)) {
    throw new CustomError('A senha deve conter pelo menos 1 letra', 400);
  }
  if (!isThereANumber(data.password)) {
    throw new CustomError('A senha deve conter pelo menos 1 número', 400);
  }
  if (data.birthDate.length !== 10) {
    throw new CustomError('A data deve estar no formato 00/00/0000', 400);
  }
  if (isThereALetter(data.birthDate)) {
    throw new CustomError('Data de nascimento inválida', 400);
  }
  if (!isBirthDateValid(data.birthDate)) {
    throw new CustomError('Data de nascimento inválida', 400);
  }
  const hasEmail = await isEmailAlreadyUsed(data.email);
  if (hasEmail) {
    throw new CustomError('Email já utilizado', 400);
  }
  console.log('Inserting a new user into the database...');
  const user = new User();
  user.name = data.name;
  const promiseCrypto = promisify(crypto.scrypt);
  const derivedKey = (await promiseCrypto(data.password, 'salt', 10)) as Buffer;
  user.hash = derivedKey.toString('hex');
  user.email = data.email;
  user.birthDate = data.birthDate;
  await AppDataSource.manager.save(user);
  console.log('Saved a new user with id: ' + user.id);
  return user;
}

function isThereANumber(str: string) {
  const regex = /[0-9]/;
  return regex.test(str);
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

function isBirthDateValid(str: string) {
  const day = parseInt(str.substring(0, 2));
  if (day > 31) {
    return false;
  }
  const month = parseInt(str.substring(3, 5));
  if (month > 12) {
    return false;
  }
  const year = parseInt(str.substring(6));
  if (year > 2022) {
    return false;
  }
  return true;
}

async function isEmailAlreadyUsed(str: string) {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: str,
  });
  return user !== null;
}

export async function hashPassword(password: string) {
  const promiseCrypto = promisify(crypto.scrypt);
  const derivedKey = (await promiseCrypto(password, 'salt', 10)) as Buffer;
  return derivedKey.toString('hex');
}
