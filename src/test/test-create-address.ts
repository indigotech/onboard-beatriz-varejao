import { expect } from 'chai';
import { queryUsers, queryBase } from './input';
import { createToken } from '../create-token';
import { countUsers } from '../find-user';
import { seedUser } from '../seed/seed-user';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

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
      query: mutAdress,
      variables: {
        adress: {
          CEP: '09030-010',
          Street: 'rua X',
          StreetNumber: '121',
          Complement: 'ap22',
          Neighborhood: 'bairro a',
          City: 'cidade das esmeraldas',
          State: 'ww',
        },
        email: 'eu@gmail.com',
      },
    });
    expect(response2.data.data.createAdress).to.be.eql(responseAdress1);

    const response3 = await axios.post(url, {
      query: mutAdress,
      variables: {
        adress: {
          CEP: '04119-903',
          Street: 'rua W',
          StreetNumber: '33',
          Complement: 'ap11',
          Neighborhood: 'bairro b',
          City: 'cidade dos jasmins',
          State: 'xx',
        },
        email: 'eu@gmail.com',
      },
    });
    expect(response3.data.data.createAdress).to.be.eql(responseAdress2);
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
