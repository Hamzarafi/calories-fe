import { ApolloClient, InMemoryCache } from "@apollo/client";

export const caloriesBEClient = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});
