import axios from 'axios';
import { expect } from 'chai';
import { createdUser, expectResponse } from './input';
import { createToken } from '../create-token';
import { findUser } from '../find-user';

describe('Testing createUser', () => {
  it('should create an user and return it', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(0, true);
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
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
    const user = await findUser('eu@gmail.com');
    expect(user.name).to.be.eq(input.name);
    expect(user.birthDate).to.be.eq(input.birthDate);
    expect(response.data.data.createUser).to.eql(expectResponse(user.id, false));
  });
  it('should return error email already logged', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(0, true);
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    await axios.post(
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
    const error = {
      errors: [{ message: 'Email já utilizado', code: 400 }],
      data: { createUser: null },
    };
    expect(response.data).to.be.eql(error);
  });
  it('should return error unsafe password', async () => {
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
    const error = {
      errors: [
        {
          message: 'A senha deve conter pelo menos 6 caracteres',
          code: 400,
        },
      ],
      data: { createUser: null },
    };
    expect(response.data).to.be.eql(error);
  });
  it('should return error unvalid birthDate', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(0, true);
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: 'BBB',
      password: 'mudar123',
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
    const error = {
      errors: [{ message: 'Data de nascimento inválida', code: 400 }],
      data: { createUser: null },
    };
    expect(response.data).to.be.eql(error);
  });
});
