const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id }).select('-__v -password')
        return data;
      }
      throw new AuthenticationError('Please log in to continue.');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Sorry! No user was found with that email address.');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password. Please try again.');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
