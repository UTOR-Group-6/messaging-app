const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
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
  },
  { timestamps: true }
);


const Message = model('Message', messageSchema);

module.exports = Message;
