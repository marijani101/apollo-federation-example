
import { ApolloServer, gql} from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

// Set port number
const { PORT = 5010 } = process.env;

(async () => {
  // Initialize an ApolloGateway instance and pass it an array of services
  // user and wallets api
  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'user-api', url: 'http://localhost:5011' },
      { name: 'wallets-api', url: 'http://localhost:5012' },
    ],
  });

  // Pass the ApolloGateway to the ApolloServer constructor
  const server = new ApolloServer({
    gateway,
    // Disable subscriptions (not currently supported with ApolloGateway)
    subscriptions: false,
  });

  server.listen({ port: PORT}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();