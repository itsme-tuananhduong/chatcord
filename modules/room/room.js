const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
    },
    roomAvatar: {
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    members: {
      type: Array,
    },
    createdBy: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", RoomSchema);
