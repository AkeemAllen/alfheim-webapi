const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  price: {
    type: Number,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  town_city: {
    type: String,
    required: false,
    default: null,
  },
  description: {
    type: String,
    required: false,
  },
  parish: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Room", roomSchema);
