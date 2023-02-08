export const createdUser = `#graphql
mutation createUser ($user: UserInput) {
    createUser ( data: $user) {
      birthDate
      email
      id
      name
  }
}`;

export const mutlogin = `#graphql
mutation login ( $user: LogInputUser) {
    login (data: $user ) { 
      user 
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
query findUser ($email: String){
    findUser (email: $email) {
      birthDate
      email
      name
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
    code: 401,
    details: 'token inválido',
  },
];

export const userErrorNotFound = [{ message: 'Usuário não encontrado', code: 404 }];

export const userDatabase = {
  data: {
    findUser: { birthDate: '27/12/1900', email: 'eu@gmail.com', name: 'eu' },
  },
};

export const expectedResponse = { birthDate: '27/12/1900', email: 'eu@gmail.com', id: '1', name: 'eu' };

export const expectedResponseLog = { birthDate: '27/12/1900', email: 'eu@gmail.com', id: '3', name: 'eu' };

export const expectedResponseUser = {
  id: '4',
  birthDate: '27/12/1900',
  email: 'eu@gmail.com',
  name: 'eu',
  hash: '7f658385f4d54cba7ce3',
};
