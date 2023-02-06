export const typeDefs = `#graphql
  input UserInput {
     name: String!
     email: String!
     birthDate: String!
     password: String! 
  }
  input AdressInput {
    CEP: String!
    Street: String!
    StreetNumber: String!
    Complement: String
    Neighborhood: String!
    City: String!
    State: String!
  }
  type Adress {
    id: ID!
    CEP: String!
    Street: String!
    StreetNumber: String!
    Complement: String
    Neighborhood: String!
    City: String!
    State: String!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    birthDate: String!
    hash: String!
    adress: [Adress]
  }
  type UserAdress {
    id: ID!
    CEP: String!
    Street: String!
    StreetNumber: String!
    Complement: String
    Neighborhood: String!
    City: String!
    State: String!
    user: User
  }
  type LogUser {
    user: User!
    token: String!
  }
  type Page {
    users: [User]!
    total: Int!
    before: Int!
    after: Int!
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
    users (before: Int = 0, limit: Int = 10): Page
  }
  type Query {
    users (before: Int, userToReturn: Int): Page
  }
  type Mutation {
    createAdress (adress: AdressInput, username: String): UserAdress
  }
`;
