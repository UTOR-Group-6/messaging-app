const mongoose = require('mongoose');
const { Schema } = mongoose;


const chatSchema = new Schema(
  {
    users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
