import { expect } from 'chai';
import { mutlogin, createRepositoryUser, queryBase } from './input';
import { authorize } from '../create-token';
import { findUser } from '../find-user';
import { LogInputUser } from 'user-input';

describe('Testing Login', () => {
  it('should return a login user', async () => {
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    const inputLog: LogInputUser = {
      user: input.email,
      password: input.password,
    };
    await createRepositoryUser(input);
    const variables = {
      user: inputLog,
    };
    const response = await queryBase(mutlogin, variables, undefined);
    const user = await findUser(input.email);
    expect(response.data.data.login.user).to.be.deep.eq({
      birthDate: user.birthDate,
      email: user.email,
      id: `${user.id}`,
      name: input.name,
    });
    expect(authorize(response.data.data.login.token)).to.eql(undefined);
  });

  it('should return a password incorrect', async () => {
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    const inputLog: LogInputUser = {
      user: input.email,
      password: 'mud',
    };
    await createRepositoryUser(input);
    const variables = {
      user: inputLog,
    };
    const response = await queryBase(mutlogin, variables, undefined);
    expect(response.data).to.be.eql({
      errors: [{ message: 'Senha Incorreta', code: 401 }],
      data: { login: null },
    });
  });

  it('should return user not found', async () => {
    const inputLog: LogInputUser = {
      user: 'eu@gmail.com',
      password: 'mud',
    };
    const variables = {
      user: inputLog,
    };
    const response = await queryBase(mutlogin, variables, undefined);
    expect(response.data).to.be.eql({
      errors: [{ message: 'Usuário não encontrado', code: 404 }],
      data: { login: null },
    });
  });
});
