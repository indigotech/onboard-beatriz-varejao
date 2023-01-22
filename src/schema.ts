export const typeDefs = `#graphql
  type Query {
    hello: String
  }
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
  }
  type Mutation {
  login (data: LogInputUser, rememberMe: Boolean): LogUser
  }
  type Query {
    findUser (email: String): User
  }
  type Query {
    user (id: ID!): User
  }
`;
