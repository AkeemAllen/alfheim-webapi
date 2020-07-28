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
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  roomsOwned: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  contacts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
