//import the models
const { User, Thought} = require('../models');
//import signToken() function from utils/auth:
const { signToken } = require('../utils/auth');
//GQL can handle errors
const { AuthenticationError } = require('apollo-server-express');

//similar to controllers (MVC), serves as the means for performing an action on a data source based on a request
//note: assigns username to params if username is truthy, if not then empty.
//if username defined in parameter and assigned as value to params, the .find() method will lookup a specific match--e.g. username match.
//a resolver can accept four arguments in the following order:

//parent - if we used nested resolvers to handle more complicated actions, 
//as it would hold the reference to the resolver that executed the nested resolver function.
//can be omitted but has to be called arbitrarily to get to the next parameters like 'args' e.g. (parent, {username})
// parents was added as a parameter but no parent was actually passed through as an argument.

//args - object of all of values passed into a query or mutation request as parameters. username was destructed to be used.

//context - if we were to need the same data to be accessible 
//by all resolvers, such as a logged-in user's status or API access token,
// this data will come through this context parameter as an object

//info - This will contain extra info about an operation's curent state. 
//this isnt used frequently, but it can be implemented for more advanced uses.
const resolvers = {
    Query: {
        me: async(parent, args, context)=>{
            if (context.user) {
                const userData = await User.findOne({})
                .select('-__v -password')
                .populate('thoughts')
                .populate('friends');

                return userData;
            }
            
            throw new AuthenticationError ('Not logged in');
        },
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
                .populate('friends')
                .populate('thoughts');
        }
    },
    Mutation: {
        addThought: async(parent, args, context) => {
            if (context.user) {
                const thought = await Thought.create({...args, username: context.user.username});

                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {thoughts:thought._id}},
                    {new:true}
                );

                return thought;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addReaction: async (parent, {thoughtId, reactionBody}, context) => {
            if (context.user) {
                const updatedThought = await Thought.findOneAndUpdate(
                    {_id: thoughtId},
                    { $push: {reactions: {reactionBody, username: context.user.username}}},
                    { new: true, runValidators: true}
                );

                return updatedThought;
            }

            throw new AuthenticationError ('You need to be logged in');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError ('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;