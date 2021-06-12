const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  personalID: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  street: {
    type: String,
    required: false,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: false,
  },
  town_city: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  parish: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("Room", roomSchema);
