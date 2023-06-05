const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    messageText: {
      type: String
    },
    user: {
      type:String
    },
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



module.exports = messageSchema;