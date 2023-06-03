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
          populate: {
            path: 'messages',
            model: 'Message'
          }
        });

        const chat = user.chats.find(chat => chat.id === id);

        if (chat) {
          return chat;
        } else {
          throw new Error("No chats found")
        }
      } 
      throw new Error("Please log in to view chats!")
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
    createChat: async (parent, args, context) => {
      if (context.user) {
        const newChat = new Chat();
        const savedChat = await newChat.save();
        return savedChat;
      }
      throw new AuthenticationError('Not logged in');
    },
    createMessage: async(parent, { chatId, messageText }, context) => {
      if (context.user) {
        const chat = await Chat.findById(chatId);
        if (!chat) {
          throw new Error("Chat not found");
        }

        const newMessage = new Message({
          messageText,
          user: context.user.id,
        });

        chat.messages.push(newMessage);
        await chat.save();

        return newMessage;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
