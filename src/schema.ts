export const typeDefs = `
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
    password: String!
  }
  type Mutation {
  createUser (data: UserInput): User
  }
`;