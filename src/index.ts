import { ApolloServer } from '@apollo/server';

import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `

  type Query {
    hello: String
  }
`


  // The root provides a resolver function for each API endpoint
const resolvers = {
    Query: {
      hello: () => {
      return 'Hello world!';
      },
    },
  };
// The ApolloServer constructor requires two parameters: your schema

// definition and your set of resolvers.

const server = new ApolloServer({
    typeDefs,
    resolvers
});

  
startStandaloneServer(server, {

    listen: { port: 4000 },
  
  }).then( ({url})=>{
  
  
  console.log(`🚀  Server ready at: ${url}`);})