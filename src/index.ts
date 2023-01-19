import { ApolloServer } from '@apollo/server';

import { startStandaloneServer } from '@apollo/server/standalone';

//import { User } from 'User';
import { AppDataSource } from './data-source';

import { UserInput } from './UserInput';

import { User } from './entity/User';

import { setupDatabase } from './database';

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

const resolvers = {
  Mutation: {
    createUser: async (_, args: { data: UserInput }) => {
      const { data } = args;
      console.log('Inserting a new user into the database...');
      const user = new User();
      user.name = data.name;
      user.password = data.password;
      user.email = data.email;
      user.birthDate = data.birthDate;
      await AppDataSource.manager.save(user);
      console.log('Saved a new user with id: ' + user.id);
      return { id: user.id, email: user.email, name: user.name, birthDate: user.birthDate };
    },
  },
  Query: {
    hello: () => {
      return 'Hello world!';
    },
  },
};
setupgeral();

async function setupgeral() {
  await setupDatabase();
  const server = new ApolloServer({ typeDefs, resolvers });

  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  });
}
