//import the models
const { User, Thought} = require('../models');

//similar to controllers (MVC), serves as the means for performing an action on a data source based on a request
//note: assigns username to params if username is truthy, if not then empty.
//if username defined in parameter and assigned as value to params, the .find() method will lookup a specific match--e.g. username match.
//a resolver can accept four arguments in the following order:

//parent - if we used nested resolvers to handle more complicated actions, 
//as it would hold the reference to the resolver that executed the nested resolver function.
//can be omitted but has to be called arbitrarily to get to the next parameters like 'args' e.g. (parent, {username})
// parents was added as a parameter but no parent was actually passed through as an argument.

//args - object of all of values passed into a query or mutation request as parameters. username was destructed to be used.

//contect - if we were to need the same data to be accessible 
//by all resolvers, such as a logged-in user's status or API access token,
// this data will come through this context parameter as an object

//info - This will contain extra info about an operation's curent state. 
//this isnt used frequently, but it can be implemented for more advanced uses.
const resolvers = {
    Query: {
        thoughts: async (parent, {username}) => {
            const params = username ? {username} : {};
            return Thought.find(params).sort({ createdAt: -1});
        },
        thought: async( parent, {_id}) => {
            return Thought.findOne({_id});
        },
        //get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        //get a user by username
        user: async (parent, { username }) => {
            return User.findOne({username})
                .select('-__v -password')
                .populate('firends')
                .populate('thoughts');
        }
    }
};

module.exports = resolvers;