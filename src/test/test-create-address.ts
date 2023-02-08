import { expect } from 'chai';
import {
  queryUser,
  createdUser,
  mutAddress,
  responseAddress1,
  responseAddress2,
  expectedUser,
  expectedResponseUser,
} from './input';
import { createToken } from '../create-token';

describe('Testing createAdress', () => {
  it('should create an adress and return it', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(0, true);
    await axios.post(
      url,
      {
        query: createdUser,
        variables: {
          user: {
            name: 'eu',
            email: 'eu@gmail.com',
            birthDate: '27/12/1900',
            password: 'mudar123',
          },
        },
      },
      {
        headers: {
          authorization: token,
        },
      },
    );
    const response2 = await axios.post(url, {
      query: mutAddress,
      variables: {
        address: {
          CEP: '09030-010',
          street: 'rua X',
          streetNumber: '121',
          complement: 'ap22',
          neighborhood: 'bairro a',
          city: 'cidade das esmeraldas',
          state: 'ww',
        },
        email: 'eu@gmail.com',
      },
    });
    expect(response2.data.data.createAdress).to.be.eql(responseAddress1);

    const response3 = await axios.post(url, {
      query: mutAddress,
      variables: {
        adress: {
          CEP: '04119-903',
          street: 'rua W',
          streetNumber: '33',
          complement: 'ap11',
          neighborhood: 'bairro b',
          city: 'cidade dos jasmins',
          state: 'xx',
        },
        email: 'eu@gmail.com',
      },
    });
    expect(response3.data.data.createAdress).to.be.eql(responseAddress2);
  });

  it('testing the query user', async () => {
    const url = 'http://localhost:4000';
    const id = (await lastUser()) - 1;
    const token = createToken(id, true);
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 1 } },
      {
        headers: {
          authorization: token,
        },
      },
    );
    console.log(response.data.data);
  });
});
