// apollo-client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://retail-api.mona.website/graphql", // Your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
