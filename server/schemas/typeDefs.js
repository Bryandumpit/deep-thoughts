//import the gql tagged template function; i.e. pulls the 'gql' function from apollo-server-express.
//tagged templates -- advanced use of template literals introduced with ES6; can parse template literals with tags 
//e.g. gql is a tag hence syntax gql`{template}`, where gql can parse {template}. const typeDef is the tagged template while gql is the tag and `` marks the template literal.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates

const {gql} = require('apollo-server-express');

//create our typeDefs
//we access our API through two passages: queries and mutations.
//A query is defined by using `type Query {}` then you can define different type of queries by typing them e.g. helloWorld is a query 
//and the type of data returned by this query is a String (scalar).
//built-in data types within GraphQl is called 'scalars'. [Thought] is a custom datatype that is an array denoted by []
//after defining the query, need to setup the resolver (check resolvers.js) that will serve the response for the query.
//if a custom datatype is created, need to define above Query that calls it. ID is same as String but acts as a unique identifier, Int is Integer
//a query can have a parameter passed through it e.g. thoughts(username: String);
// NOTE passing through a parameters is not automatically a requirement. can query without unless defined as such.
//note the custome types for Thought and Reaction are based on the properties defined under Models
//if calling/querying/mutating custom data type, need to specify which data is requested including nested data like Reaction
//if querying data with '!' in parameter, the data must exist or we get error.

const typeDefs = gql`
    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }
    
    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Query {
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }
`;

//export the typeDefs
module.exports = typeDefs;