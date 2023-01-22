import { setupServer } from './server';
import { setupDatabase } from './database';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { createdUser } from './test/input';
import { createToken } from './create-token';

seed('/test.env');

async function seed(dir) {
  dotenv.config({ path: process.cwd() + dir });
  await setupDatabase();
  await setupServer();
  const alf = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  let random = 0;
  for (let i = 0; i < 50; i++) {
    const user = { name: '', email: '', birthDate: '', password: '' };
    for (let j = 0; j < 5; j++) {
      random = float2int(Math.random() * 26);
      user.name = user.name + alf[random];
      user.email = user.email + alf[random];
      user.password = user.password + alf[random];
    }
    const now = Date.now();
    random = Math.random() * now;
    const date = new Date(random);
    user.birthDate = formatDate(date);
    for (let k = 0; k < 3; k++) {
      random = float2int(Math.random() * 10);
      user.email = user.email + num[random];
      user.password = user.password + num[random];
    }
    user.email = user.email + '@gmail.com';
    const url = 'http://localhost:4000';
    const token = createToken(i, true);
    await axios.post(
      url,
      {
        query: createdUser,
        variables: {
          user: user,
        },
      },
      {
        headers: {
          authorization: token,
        },
      },
    );
  }
}
function formatDate(date) {
  let d = date.getUTCDate().toString(); // getUTCDate() returns 1 - 31
  let m = (date.getUTCMonth() + 1).toString(); // getUTCMonth() returns 0 - 11
  const y = date.getUTCFullYear().toString(); // getUTCFullYear() returns a 4-digit year
  let formatted = '';
  if (d.length === 1) {
    // pad to two digits if needed
    d = '0' + d;
  }
  if (m.length === 1) {
    // pad to two digits if needed
    m = '0' + m;
  }
  formatted = d + '/' + m + '/' + y; // concatenate for output
  return formatted;
}

function float2int(value: number) {
  return value | 0;
}
