const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// rename to message for clarity
const chatSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  message: {
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
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
