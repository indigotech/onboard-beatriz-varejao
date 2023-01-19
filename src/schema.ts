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
  type Mutation {
  createUser (data: UserInput): User
  }
`;
