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

export const queryUser = `#graphql
query {
    findUser (email: "eu@gmail.com") {
      birthDate
      email
      name
      hash
  }
}`;

export const userDatabase = {
  data: {
    findUser: { birthDate: '27/12/1900', email: 'eu@gmail.com', name: 'eu', hash: '7f658385f4d54cba7ce3' },
  },
};
export const expectedResponse = { birthDate: '27/12/1900', email: 'eu@gmail.com', id: '1', name: 'eu' };
