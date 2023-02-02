import axios from 'axios';
import { UserInput, LogInputUser } from '../user-input';
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
  }
}`;

export async function queryBase(query: string, input: UserInput, token: string) {
  const url = 'http://localhost:4000';
  const response = await axios.post(
    url,
    {
      query,
      variables: {
        user: input,
      },
    },
    {
      headers: {
        authorization: token,
      },
    },
  );
  return response;
}

export async function queryBaseUser(query: string, id: number, token: string) {
  const url = 'http://localhost:4000';
  const response = await axios.post(
    url,
    { query, variables: { id } },
    {
      headers: {
        authorization: token,
      },
    },
  );
  return response;
}

export async function queryBaseLogin(query: string, input: LogInputUser) {
  const url = 'http://localhost:4000';
  const response = await axios.post(url, {
    query,
    variables: {
      user: input,
    },
  });
  return response;
}

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

export const queryUsers = `#graphql
query users ($limit: Int) {
    users ( userToReturn: $limit) {
      birthDate
      email
      id
      name
  }
}`;
