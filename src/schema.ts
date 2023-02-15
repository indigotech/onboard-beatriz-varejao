export const typeDefs = `#graphql
  input UserInput {
     name: String!
     email: String!
     birthDate: String!
     password: String! 
  }
  input AddressInput {
    CEP: String!
    street: String!
    streetNumber: String!
    complement: String
    neighborhood: String!
    city: String!
    state: String!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    birthDate: String!
    hash: String!
    address: [Address]
  }
  type UserAddress {
    id: ID!
    CEP: String!
    street: String!
    streetNumber: String!
    complement: String
    neighborhood: String!
    city: String!
    state: String!
    user: User
  }
  type Address {
    id: ID!
    CEP: String!
    street: String!
    streetNumber: String!
    complement: String
    neighborhood: String!
    city: String!
    state: String!
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
  createAddress (address: AddressInput, username: String): UserAddress
  login (data: LogInputUser, rememberMe: Boolean): LogUser
  }
  type Query {
    user (id: ID!): User
    users (before: Int = 0, limit: Int = 10): Page
  }
`;
