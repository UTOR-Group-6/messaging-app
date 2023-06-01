const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    messageText: { type: String },
  },
  { timestamps: true }
);


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
