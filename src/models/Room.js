const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "G_User",
  },
  location: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: false,
    default: false,
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
  expirationDate: {
    type: Date,
    expires: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Room", roomSchema);
