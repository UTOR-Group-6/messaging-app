const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
  },
  messageText: {
    type: String,
  },
  messageImg: {
    data: Buffer,
    contentType: String,
  },
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
