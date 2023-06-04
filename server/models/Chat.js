const { Schema, model } = require("mongoose");
const Users = require("./User.js");
const dateFormat = require("../utils/dateFormat");

const chatSchema = new Schema({
  users: [
    {
      // array of users in the chat
    },
  ],
  messages: [
    {
      sender: {
        // User
        type: String,
        required: true,
      },
      content: {
        img: {
          data: Buffer,
          contentType: String,
        },
        text: {
          type: String,
        },
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
