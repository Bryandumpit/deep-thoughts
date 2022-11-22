import React from 'react';

//ApolloProvider is a special type of React component that we'll use to provide data to all of the other components.
//ApolloClient is a constructor function that will help initialize the connection to the GraphQL API server.
//InMemoryCache enables the Apollo Client instance to cache the API response data so that we can perform requests more efficiently.
//createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

//establishes a new link to GraphQL server at its /graphql endpoint with createHttpLink()
const httpLink = createHttpLink({
  uri: '/graphql',
});
//ApolloClient constructor was used to instantiate the Apollo Client instance and create the connection to the API endpoint.
//A new cache object was instantiated as well via 'new InMemoryCache'
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

//all JSX wrapped within <ApolloProvider> will have access to the server's API data throught the client prop(erty) which we assigned client to.
function App() {
  return (
    <ApolloProvider client={client}>
      <div className = "flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
