import axios from 'axios';
import { expect } from 'chai';
import { queryUser, createdUser, expectResponse } from './input';
import { createToken } from '../create-token';
import { findUser } from '../find-user';

describe('Testing Query User', () => {
  it('should fetch the infos of the first user', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(1, true);
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
    const user = await findUser('eu@gmail.com');
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: user.id } },
      {
        headers: {
          authorization: token,
        },
      },
    );
    expect(response.data.data.user).to.eql(expectResponse(user.id, true));
  });

  it('should return error User not found', async () => {
    const url = 'http://localhost:4000';
    const token = createToken(2, true);
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 2 } },
      {
        headers: {
          authorization: token,
        },
      },
    );
    const userErrorNotFound = [{ message: 'Usuário não encontrado', code: 404 }];
    expect(response.data.errors).to.eql(userErrorNotFound);
  });

  it('should return error token invalid', async () => {
    const url = 'http://localhost:4000';
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxIiwiaWF0IjoxNTE2MjM5MDIyfQ.p8mZm6I0CXfkRfoEQkGi34zfHKiBZ8ypQ4q5N3vJOL4NOME0feb8MhNg1JeKNnN1OTWuV_ngmnKmd710eiEYovUYw5butqzAvYIVJJtmrn7egiuWRIVbposZv9OZxr9z6tx3rDdNOky7O8zZoI_GAQijEiY62t2XL0xCCtWzfR33MMc__NUU9_1owXHFgrakPqMhuTmCAasBUWPZjDZLvFRY3-kJjY3Pd9iicGCG_m9uE5mO5iYY84OLT15ARANs5GYGx3u5vQnAHf7mqUiCvfo6WLN6_XhOjtAs-CFWmCKwmH239iwQSpMvuvFlvPa_SSJl9Vr79Pp1D16QjFfgYQ';
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 4 } },
      {
        headers: {
          authorization: token,
        },
      },
    );
    const userError = [
      {
        message: 'Operação não autorizada',
        code: 401,
        details: 'token inválido',
      },
    ];
    expect(response.data.errors).to.eql(userError);
  });
});
