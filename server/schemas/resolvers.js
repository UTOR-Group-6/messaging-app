const { AuthenticationError } = require("apollo-server-express");
const { User, Chat } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return data;
      }
      throw new AuthenticationError("Please log in to continue.");
    },

    chats: async (parent, { userA, userB }) => {
      // return all chat messages between sender and recipient
      // in order to match the array forwards and backwards, save in alphabetical order
      const chatlogs = await Chat.find({
        users: { $eq: [userA, userB].sort() },
      })
        .populate("users")
        .populate("sender")
        .sort("createdAt");
      // Should also populate message.sender
      // may need to rework sort method, since it works alphabetically
      return chatlogs;
    },

    chat: async (parent, { messageId }) => {
      // Return one message
      const message = await Chat.findByID(messageId)
        .populate("users")
        .populate("sender");
      return message;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "Sorry! No user was found with that email address."
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password. Please try again.");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addChat: async (
      parent,
      { sender, recipient, fileName, fileData, text }
    ) => {
      const chat = await Chat.create({
        users: [sender, recipient].sort(),
        sender: sender,
        image: { fileName: fileName, fileData: fileData },
        text: text,
      });

      return { chat };
    },
  },
};

module.exports = resolvers;
