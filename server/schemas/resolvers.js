const { AuthenticationError } = require('apollo-server-express');
const { User, Chat, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    messages: async () => Message.find(),

    chats: async (parent, {message}) => {
      const params = {};

      if (message) {
        params.message = message;
      }

      return Chat.find(params).populate('messages')
    },

    chat: async (parent, { id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id).populate({
          path: 'chats',
          populate: 'messages'
        });

        return user.chats.id(id)
      }
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id).populate({
          path: 'chats',
          populate: 'message'
        })

        return user;
      }

      throw new AuthenticationError('Please log in!')
    }
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
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
