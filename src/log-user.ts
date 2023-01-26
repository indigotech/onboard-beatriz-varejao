import { User } from './entity/User';

export interface LogInputUser {
  user: string;
  password: string;
}

export interface LogOutUser {
  user: User;
  token: string;
}

export class LogOutUser {
  user: User;
  token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }
}
