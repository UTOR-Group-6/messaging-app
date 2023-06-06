const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bio: {
      type: String,
      trim: true,
    },
    icon: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
