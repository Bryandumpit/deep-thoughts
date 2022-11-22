import React from 'react';

const ThoughtList = ({ thoughts, title }) => {
    
    if (!thoughts.length) {
        return <h3>No Thoughts Yet</h3>;
    }
    //NOTE: key property on first div from .map method helps React internally track which data needs to be re-rendered if something changes.
    return (
        <div>
            <h3>{title}</h3>
            {thoughts && 
                thoughts.map( thought => (
                    <div key={thought._id} className="card mb-3">
                        <p className="card-header">
                            {thought.username}
                            thought on {thought.createdAt}
                        </p>
                        <div className="cardbody">
                            <p>{thought.thoughtText}</p>
                            <p className="mb-0">
                                Reactions: {thought.reactionCount} || click to{' '}
                                {thought.reactionCount ? 'see' : 'start'} the discussion!
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ThoughtList;