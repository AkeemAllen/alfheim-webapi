const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  roomsOwned: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  contact: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
