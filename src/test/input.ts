import axios from 'axios';
import { UserInput } from '../user-input';
import { User } from '../entity/User';
import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { AppDataSource } from '../data-source';

export const createdUser = `#graphql
mutation createUser ($user: UserInput) {
    createUser ( data: $user) {
      birthDate
      email
      id
      name
  }
}`;

export const mutlogin = `#graphql
mutation login ( $user: LogInputUser) {
    login (data: $user ) { 
      user 
     {
    birthDate
      email
      id
      name
  }
    token
  }
  }`;

export const queryUser = `#graphql
query user ($id: ID!) {
    user (id: $id) {
      id
      birthDate
      email
      name
      adress {
        id,
        CEP,
        Street,
        StreetNumber,
        Complement,
        Neighborhood,
        City,
        State
      }
  }
}`;

export async function queryBase(query: string, variables, token: string) {
  const url = 'http://localhost:4000';
  const response = await axios.post(
    url,
    {
      query,
      variables,
    },
    {
      headers: {
        authorization: token,
      },
    },
  );
  return response;
}

export const responseAdress1 = {
  id: '1',
  CEP: '09030-010',
  street: 'rua X',
  streetNumber: '121',
  complement: 'ap22',
  neighborhood: 'bairro a',
  city: 'cidade das esmeraldas',
  state: 'ww',
  user: {
    birthDate: '27/12/1900',
    email: 'eu@gmail.com',
    id: '1',
    name: 'eu',
  },
};

export const responseAddress2 = {
  id: '2',
  CEP: '04119-903',
  street: 'rua W',
  streetNumber: '33',
  complement: 'ap11',
  neighborhood: 'bairro b',
  city: 'cidade dos jasmins',
  state: 'xx',
  user: {
    birthDate: '27/12/1900',
    email: 'eu@gmail.com',
    id: '1',
    name: 'eu',
  },
};

export const userError = [
  {
    message: 'Operação não autorizada',
    code: 405,
    details: 'token inválido',
  },
];

export const queryUsers = `#graphql
query users ($skip: Int, $limit: Int) {
    users ( before: $skip, limit: $limit) {
      users {
        birthDate
        email
        id
        name
      },
    total,
    after,
    before
  }
}`;

export async function createRepositoryUser(input: UserInput) {
  const user = new User();
  user.name = input.name;
  const promiseCrypto = promisify(crypto.scrypt);
  const derivedKey = (await promiseCrypto(input.password, 'salt', 10)) as Buffer;
  user.hash = derivedKey.toString('hex');
  user.email = input.email;
  user.birthDate = input.birthDate;
  await AppDataSource.manager.save(user);
  console.log('Saved a new user with id: ' + user.id);
}
