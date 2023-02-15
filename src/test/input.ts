import axios from 'axios';
import { UserInput } from '../user-input';
import { User } from '../entity/User';
import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { AppDataSource } from '../data-source';
import { Address } from '../entity/Address';
import { AddressInput } from '../address';
import { findUser } from '../find-user';

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
      address {
        id,
        cep,
        street,
        streetNumber,
        complement,
        neighborhood,
        city,
        state
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

export const createdAddress = `#graphql
mutation createAddress ($address: AddressInput, $email: String ) {
    createAddress (address: $address, username: $email  ) {
      id,
      cep,
      street,
      streetNumber,
      complement,
      neighborhood,
      city,
      state,
      user {
        birthDate,
        email,
        id,
        name,
      }
    }
}`;

export const queryUsers = `#graphql
query users ($skip: Int, $limit: Int) {
    users ( before: $skip, limit: $limit) {
      users {
        birthDate
        email
        id
        name
        address {
        id,
        cep,
        street,
        streetNumber,
        complement,
        neighborhood,
        city,
        state
      }
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

export async function createRepositoryAddress(address: AddressInput, username: string) {
  const user = await findUser(username);
  const addressData = new Address();
  addressData.cep = address.cep;
  addressData.complement = address.complement;
  addressData.city = address.city;
  addressData.neighborhood = address.neighborhood;
  addressData.state = address.state;
  addressData.street = address.street;
  addressData.streetNumber = address.streetNumber;
  addressData.user = user;
  await AppDataSource.manager.save(addressData);
  user.address.concat([addressData]);
}
