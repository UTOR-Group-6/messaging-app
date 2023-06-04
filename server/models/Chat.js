const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const chatSchema = new Schema(
  {
    // Users in chat
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      fileName: {
        type: String,
      },
      fileData: {
        data: Buffer,
        contentType: String,
      },
    },
    text: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;
