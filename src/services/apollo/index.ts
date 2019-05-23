import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { defaultDataIdFromObject, InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const AppLink = ApolloLink.from([httpLink]);

const cache = new InMemoryCache({
  dataIdFromObject: (obj) => obj.id || defaultDataIdFromObject(obj),
});

export const apolloClient = new ApolloClient({
  link: AppLink,
  cache,
});
