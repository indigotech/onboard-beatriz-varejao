import { ApolloServer } from '@apollo/server';

import { startStandaloneServer } from '@apollo/server/standalone';

import { User } from 'User';

import { UserInput } from 'UserInput';

const typeDefs = `
  type Query {
    hello: String
  }
  input UserInput { name: String!, email: String!, birthDate: String!, password: String! }
  type User {
    id: Int!
    name: String!
    email: String!
    birthDate: String!
  }
  type Mutation {
    createUser (data: UserInput): User!
  }
`;
const resolvers = {
  Mutation: {
    createUser: (data: UserInput) => {
      const ndata: User = { id: 1, name: data.name, email: data.email, birthDate: data.birthDate };
      return ndata;
    },
  },
  Query: {
    hello: () => {
      return 'Hello world!';
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
