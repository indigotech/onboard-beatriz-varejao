import { ApolloServer } from '@apollo/server';

import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Query {
    hello: String
  }
`;
const resolvers = {
  /*Mutation: {
    createUser: (data: UserInput) => {
      const ndata: User = { id: 1, name: data.name, email: data.email, birthDate: data.birthDate };
      return ndata;
    },
    type Mutation {
    createUser (data:UserInput!): User
  }
  },*/
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
