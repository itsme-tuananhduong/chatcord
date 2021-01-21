const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
    },
    password: String,
    username: String,
    avatarLink: {
      type: String,
      default: `https://firebasestorage.googleapis.com/v0/b/cfjs-42-anhdt.appspot.com/o/default-avatar%2Fdefault-avatar-${Math.floor(
        Math.random() * 5 + 1
      )}.png?alt=media&token=aa788f9c-7501-44fb-868e-441c121ddc2e`,
    },
    // friendList: Array,
    friendList: {
      type: Array,
      default: [],
    },
    // joinedRoom: Array
    joinedRoom: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
