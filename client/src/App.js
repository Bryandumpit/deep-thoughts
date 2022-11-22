import React from 'react';

//ApolloProvider is a special type of React component that we'll use to provide data to all of the other components.
//ApolloClient is a constructor function that will help initialize the connection to the GraphQL API server.
//InMemoryCache enables the Apollo Client instance to cache the API response data so that we can perform requests more efficiently.
//createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';
//import Home page
import Home from './pages/Home';
//import the other pages
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SingleThought from './pages/SingleThought';

//browserrouter, routes and route are components that the react router library provides; browserrouter was renamed to router.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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
//<Route> elements are wrapped within <Routes> wrapped in <Router>; each <Route> has a path and element prop; 
//signifies this part of the app as the place where content will change according to URL route
function App () {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header/>
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route path="/profile">
                <Route path=":username" element={<Profile/>}/>
                <Route path="" element={<Profile/>}/>
              </Route>
              <Route
                path="/thought/:id"
                element={<SingleThought/>}
              />
              <Route
                path="*"
                element={<NoMatch/>}
              />
            </Routes>
          </div>
          <Footer/>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App;
