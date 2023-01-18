import { ApolloServer } from '@apollo/server';

import { startStandaloneServer } from '@apollo/server/standalone';

import { User } from 'User';

import { UserInput } from 'UserInput';

const typeDefs = `
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
    createUser: (_, args: { data: UserInput }): User => {
      const { data } = args;
      return { id: 1, ...data };
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
