import { UserInput } from './user-input';
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
  if (isThereALetter(data.birthDate)) {
    throw new CustomError('Data de nascimento inválida', 400);
  }
  if (!isBirthDateValid(data.birthDate)) {
    throw new CustomError('Data de nascimento inválida (a data deve estar no formato 00/00/0000)', 400);
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
  const regex = /[a-z]/;
  return regex.test(str);
}

function isBirthDateValid(date: string) {
  if (date.length !== 10) {
    return false;
  }
  try {
    const formattedDays = date.split('/');
    const epoch = new Date(
      parseInt(formattedDays[2]),
      parseInt(formattedDays[1]) - 1,
      parseInt(formattedDays[0]),
    ).getSeconds();
    const now = Date.now() / 1000;
    return epoch < now;
  } catch {
    return false;
  }
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
