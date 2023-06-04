const { AuthenticationError } = require('apollo-server-express');
const { User, Chat, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    message: async (parent, { chatId }) => {
      const messages = await Message.find({ chatId }).sort({ createdAt: -1 });
      return messages;
    },

    chats: async (parent, { _id }) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'messages',
          populate: 'chats'
        });

        return user.chats.id(_id);
      }

      throw new AuthenticationError("Please log in")
    },

    chat: async (parent, { chatId }) => {
      if (context.user) {
        return Chat.findById(chatId).populate('messages');
      } 
      throw new Error("Please log in to view chats!")
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id).populate({
          path: 'messages',
          populate: 'chats'
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
