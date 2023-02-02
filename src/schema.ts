export const typeDefs = `#graphql
  input UserInput {
     name: String!
     email: String!
     birthDate: String!
     password: String! 
  }
  type User {
    id: ID!
    name: String!
    email: String!
    birthDate: String!
    hash: String!
  }
  type LogUser {
    user: User!
    token: String!
  }
  input LogInputUser {
    user: String!
    password: String!
  }
  type Mutation {
  createUser (data: UserInput): User
  login (data: LogInputUser, rememberMe: Boolean): LogUser
  }
  type Query {
    user (id: ID!): User
  }
  type Query {
    users (userToReturn: Int): [User]
  }
`;
