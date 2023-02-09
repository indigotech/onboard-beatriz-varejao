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

export function expectResponse(id: number, returnHash: boolean) {
  const idd = `${id}`;
  if (returnHash) {
    const expectedResponse = {
      birthDate: '27/12/1900',
      email: 'eu@gmail.com',
      hash: '7f658385f4d54cba7ce3',
      id: idd,
      name: 'eu',
    };
    return expectedResponse;
  }
  const expectedResponse = {
    birthDate: '27/12/1900',
    email: 'eu@gmail.com',
    id: idd,
    name: 'eu',
  };
  return expectedResponse;
}
