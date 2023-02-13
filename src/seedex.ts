import { User } from './entity/User';
import { AppDataSource } from './data-source';
import crypto from 'node:crypto';
import { promisify } from 'node:util';

export async function seedUser(n: number) {
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
  for (let i = 0; i < n; i++) {
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
    const userEnt = new User();
    userEnt.name = user.name;
    const promiseCrypto = promisify(crypto.scrypt);
    const derivedKey = (await promiseCrypto(user.password, 'salt', 10)) as Buffer;
    userEnt.hash = derivedKey.toString('hex');
    userEnt.email = user.email;
    userEnt.birthDate = user.birthDate;
    await AppDataSource.manager.save(userEnt);
  }
  console.log('Saved', n, 'new users in the database');
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
