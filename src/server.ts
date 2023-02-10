import { typeDefs } from './schema';
import { resolvers } from './resolver';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { formatError } from './custom-errror';

export async function setupServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const headers = req.headers;
      return { headers };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
}
