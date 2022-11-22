import React from 'react';

//allows us to pull the id from the url
import { useParams } from 'react-router-dom';
//import useQuery and QUERY_THOUGHT to access single thought query (e.g. `query thought {...}`) from utils/queries.js
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

//import new ReactionList component
import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  //Router, Routes, Route in App.js pulls id and puts in to url
  //captures and console.logs id from url using useParams.
  const { id: thoughtId } = useParams();
  console.log(thoughtId);
  //similar to when we were using useQuery hook and QUERY_THOUGHT function in Home.js (get all thoughts)
  //loading and data are destructured from useQuery. 
  //'loading' used to show a loading element briefly while data is being loaded. 'data' used to populate 'thought' object. Data comes from the query used from QUERY_THOUGHT.
  //2nd arg on useQuery passes the thoughtId for the query. thoughtId extracted from URL using useParams().
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId}
  });
  //while loading the optional chaining operator ?. will assign undefined to const thought and not throw an error. once data is available it is assigned to thought.
  const thought = data?.thought || {};
  //recall loading comes from useQuery hook (property of useQuery)
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="card mb-3">
        <p classname="card-header">
          <span style={{fontWeight: 700}} className="text-dark">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
