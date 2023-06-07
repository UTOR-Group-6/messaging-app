const { User, Chat, } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    chat: async (parent, { _id }, context) => { // find one chat by id
      if (context.user) {
        const chat = await Chat.findOne({ _id }).populate('users')
        return chat;
      }

      throw new AuthenticationError("Please log in")
    },

    findUser: async (parent, { username }) => { // find one user by id
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },

    user: async (parent, args, context) => { // find logged in user
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'chats',
          populate: 'users'
        })

        return user;
      }

      throw new AuthenticationError('Please log in!')
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => { // login user
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
    addUser: async (parent, { username, email, password }) => { // create a new user
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    createChat: async (parent, args, context) => { // create a new chat with a user
        const newChat = await Chat.create(args)
        return newChat;
    },
    updateChat: async (parent, args, context) => { // update chat > used to create messages
        const updatedChat = await Chat.findByIdAndUpdate( 
          { _id: args._id },
          { $addToSet: { messages: { messageText: args.messageText, user: args.user } } },
          { new: false }
        )
        return updatedChat
    },
    updateUserChats: async (parent, args, context) => { // update chats array in User Schema
      const updatedUser = await User.findByIdAndUpdate(
        { _id: args._id },
        { $addToSet: { chats: { _id: args.chatId } }},
        { new: true }
      ).populate({
        path: 'chats',
        populate: 'users'
      })
      return updatedUser;
    }
  },
};

module.exports = resolvers;