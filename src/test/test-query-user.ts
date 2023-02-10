import { expect } from 'chai';
import { queryUser, createRepositoryUser, queryBase } from './input';
import { createToken } from '../create-token';
import { findUser } from '../find-user';

describe('Testing Query User', () => {
  it('should fetch the infos of the first user', async () => {
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    await createRepositoryUser(input);
    const user = await findUser(input.email);
    const token = createToken(0, true);
    const variables = { id: user.id };
    const response = await queryBase(queryUser, variables, token);
    expect(response.data.data.user).to.be.deep.eq({
      birthDate: user.birthDate,
      email: user.email,
      id: `${user.id}`,
      name: input.name,
    });
  });

  it('should return error User not found', async () => {
    const token = createToken(2, true);
    const variables = { id: 2 };
    const response = await queryBase(queryUser, variables, token);
    expect(response.data.errors).to.eql([{ message: 'Usuário não encontrado', code: 404 }]);
  });

  it('should return error token invalid', async () => {
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxIiwiaWF0IjoxNTE2MjM5MDIyfQ.p8mZm6I0CXfkRfoEQkGi34zfHKiBZ8ypQ4q5N3vJOL4NOME0feb8MhNg1JeKNnN1OTWuV_ngmnKmd710eiEYovUYw5butqzAvYIVJJtmrn7egiuWRIVbposZv9OZxr9z6tx3rDdNOky7O8zZoI_GAQijEiY62t2XL0xCCtWzfR33MMc__NUU9_1owXHFgrakPqMhuTmCAasBUWPZjDZLvFRY3-kJjY3Pd9iicGCG_m9uE5mO5iYY84OLT15ARANs5GYGx3u5vQnAHf7mqUiCvfo6WLN6_XhOjtAs-CFWmCKwmH239iwQSpMvuvFlvPa_SSJl9Vr79Pp1D16QjFfgYQ';
    const variables = { id: 2 };
    const response = await queryBase(queryUser, variables, token);
    expect(response.data.errors).to.eql([
      {
        message: 'Operação não autorizada',
        code: 401,
        details: 'token inválido',
      },
    ]);
  });
});
