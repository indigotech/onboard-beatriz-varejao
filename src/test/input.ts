export const user1 = `#graphql
mutation {
    createUser (data: {
      name: "eu",
      email: "eu@gmail.com",
      birthDate: "27/12/1900",
      password: "mudar123"
    } 
  ) {
      birthDate
      email
      id
      name
  }
}`;
export const mutlogin = `#graphql
mutation {
    login (data: {
      user: "eu@gmail.com",
      password: "mudar123"
    } 
  ) { user 
     {
    birthDate
      email
      id
      name
  }
    token
  }
  }`;

export const mutloginremember = `#graphql
mutation {
    login (data: {
      user: "eu@gmail.com",
      password: "mudar123"
    } 
    rememberMe: true
  ) { user 
     {
    birthDate
      email
      id
      name
  }
    token
  }
  }`;

export const queryUserFind = `#graphql
query {
    findUser (email: "eu@gmail.com") {
      birthDate
      email
      name
      hash
  }
}`;

export const queryUser = `#graphql
query user ($id: ID!) {
    user (id: $id) {
      id
      birthDate
      email
      name
      hash
  }
}`;

export const userError = [
  {
    message: 'Operação não autorizada',
    code: 405,
    details: 'token inválido',
  },
];

export const userErrorNotFound = [{ message: 'Usuário não encontrado', code: 410 }];

export const userDatabase = {
  data: {
    findUser: { birthDate: '27/12/1900', email: 'eu@gmail.com', name: 'eu', hash: '7f658385f4d54cba7ce3' },
  },
};
export const expectedResponse = { birthDate: '27/12/1900', email: 'eu@gmail.com', id: '1', name: 'eu' };
export const expectedResponseUser = {
  id: '1',
  birthDate: '27/12/1900',
  email: 'eu@gmail.com',
  name: 'eu',
  hash: '7f658385f4d54cba7ce3',
};
