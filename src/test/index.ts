import { setupServer } from '../server';
import { dropDatabase, setupDatabase, clearDatabase } from '../database';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { expect } from 'chai';
import { queryUser, expectedResponseUser, userError, userErrorNotFound, createdUser } from './input';
import { createToken } from '../create-token';

describe('Testing Query User', () => {
  before(async () => {
    dotenv.config({ path: process.cwd() + '/test.env' });
    await setupDatabase();
    await setupServer();
  });

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
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 1 } },
      {
        headers: {
          authorization: token,
        },
      },
    );
    expect(response.data.data.user).to.eql(expectedResponseUser);
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
    expect(response.data.errors).to.eql(userErrorNotFound);
  });

  it('should return error token invalid', async () => {
    const url = 'http://localhost:4000';
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxIiwiaWF0IjoxNTE2MjM5MDIyfQ.p8mZm6I0CXfkRfoEQkGi34zfHKiBZ8ypQ4q5N3vJOL4NOME0feb8MhNg1JeKNnN1OTWuV_ngmnKmd710eiEYovUYw5butqzAvYIVJJtmrn7egiuWRIVbposZv9OZxr9z6tx3rDdNOky7O8zZoI_GAQijEiY62t2XL0xCCtWzfR33MMc__NUU9_1owXHFgrakPqMhuTmCAasBUWPZjDZLvFRY3-kJjY3Pd9iicGCG_m9uE5mO5iYY84OLT15ARANs5GYGx3u5vQnAHf7mqUiCvfo6WLN6_XhOjtAs-CFWmCKwmH239iwQSpMvuvFlvPa_SSJl9Vr79Pp1D16QjFfgYQ&publicKey=-----BEGIN%20PUBLIC%20KEY-----%0AMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo%0A4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0%2FIzW7yWR7QkrmBL7jTKEn5u%0A%2BqKhbwKfBstIs%2BbMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh%0Akd3qqGElvW%2FVDL5AaWTg0nLVkjRo9z%2B40RQzuVaE8AkAFmxZzow3x%2BVJYKdjykkJ%0A0iT9wCS0DRTXu269V264Vf%2F3jvredZiKRkgwlL9xNAwxXFg0x%2FXFw005UWVRIkdg%0AcKWTjpBP2dPwVZ4WWC%2B9aGVd%2BGyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc%0AmwIDAQAB%0A-----END%20PUBLIC%20KEY----';
    const response = await axios.post(
      url,
      { query: queryUser, variables: { id: 1 } },
      {
        headers: {
          authorization: token,
        },
      },
    );
    expect(response.data.errors).to.eql(userError);
  });
  afterEach(async () => {
    await clearDatabase();
  });
  after(async () => {
    await dropDatabase();
  });
});
