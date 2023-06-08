const mongoose = require('mongoose');
const User = require('./User')

const { Schema } = mongoose;
const messageSchema = require('./Message')

const chatSchema = new Schema(
  {
    messages: [messageSchema],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ], 
    createdAt: {
      type: Date, 
      default: Date.now
    }
  },
  {
    toJSON:{
      getters: true
    }, 
    id: false
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
