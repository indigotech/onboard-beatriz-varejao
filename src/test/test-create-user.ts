import { expect } from 'chai';
import { createdUser, createRepositoryUser, queryBase } from './input';
import { createToken } from '../create-token';
import { findUser } from '../find-user';
import crypto from 'node:crypto';
import { promisify } from 'node:util';

describe('Testing createUser', () => {
  it('should create an user and return it', async () => {
    const token = createToken(0, true);
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    const response = await queryBase(createdUser, input, token);
    const user = await findUser(input.email);
    expect(user.name).to.be.eq(input.name);
    expect(user.birthDate).to.be.eq(input.birthDate);
    const promiseCrypto = promisify(crypto.scrypt);
    const derivedKey = (await promiseCrypto(input.password, 'salt', 10)) as Buffer;
    const hash = derivedKey.toString('hex');
    expect(user.hash).to.be.eq(hash);
    const id = `${user.id}`;
    expect(response.data.data.createUser).to.be.deep.eq({
      birthDate: user.birthDate,
      email: user.email,
      id,
      name: input.name,
    });
  });

  it('should return error email already logged', async () => {
    const token = createToken(0, true);
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    await createRepositoryUser(input);
    const response = await queryBase(createdUser, input, token);
    expect(response.data).to.be.eql({
      errors: [{ message: 'Email já utilizado', code: 400 }],
      data: { createUser: null },
    });
  });

  it('should return error unsafe password', async () => {
    const token = createToken(0, true);
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mud',
    };
    const response = await queryBase(createdUser, input, token);
    expect(response.data).to.be.eql({
      errors: [
        {
          message: 'A senha deve conter pelo menos 6 caracteres',
          code: 400,
        },
      ],
      data: { createUser: null },
    });
  });

  it('should return error unvalid birthDate', async () => {
    const token = createToken(0, true);
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: 'BBB',
      password: 'mudar123',
    };
    const response = await queryBase(createdUser, input, token);
    expect(response.data).to.be.eql({
      errors: [{ message: 'Data de nascimento inválida', code: 400 }],
      data: { createUser: null },
    });
  });
});
