import { typeDefs } from './schema';
import { resolvers } from './resolver';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

export async function setupServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`🚀  Server ready at: ${url}`);
}
