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
      throw new AuthenticationError('Please log in to view this content.');
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
    saveBook: async (parent, { newBook }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: newBook }},
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('Please log in to view this content.');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId }}},
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Please log in to view this content.');
    },
  },
};

module.exports = resolvers;
