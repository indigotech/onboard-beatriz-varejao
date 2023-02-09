import axios from 'axios';
import { createToken } from '../create-token';
import { UserInput } from '../user-input';

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

export function expectResponse(id: number) {
  const idd = `${id}`;
  const expectedResponse = {
    birthDate: '27/12/1900',
    email: 'eu@gmail.com',
    id: idd,
    name: 'eu',
  };
  return expectedResponse;
}

const url = 'http://localhost:4000';
const token = createToken(0, true);
const input = {
  name: 'eu',
  email: 'eu@gmail.com',
  birthDate: '27/12/1900',
  password: 'mud',
};
const response = await axios.post(
  url,
  {
    query: createdUser,
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
