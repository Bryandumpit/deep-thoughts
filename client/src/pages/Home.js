import React from 'react';

//useQuery is a hook from apollo/client, which will allow us to make requests to the GraphQL server we connected to
//made available to the application using the <ApolloProvider> component in App.js

//we can use the useQuery hook with the QUERY_THOUGHTS function imported

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

//import ThoughtList component to Home
import ThoughtList from '../components/ThoughtList';

const Home = () => {

  //use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  //when we load the 'Home' component, we execute the query for thought data
  const thoughts = data?.thoughts || [];
  //?. acts similar to . chaining operator (think how methods are used), 
  //except that instead of causing an error if a reference is nullish(null or undefined),
  //the expression short-circuits with a return value of 'undefined'.
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div> Loading...</div>
          ): (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..."/>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
