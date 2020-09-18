const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  personalID: {
    type: String,
    required: true,
  },
  occupancy: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "G_User",
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
  isVisible: {
    type: Boolean,
    required: true,
    default: false,
  },
  town_city: {
    type: String,
    required: false,
  },
  parish: {
    type: String,
    required: false,
  },
  amenities: [String],
  rules: [String],
  image: {
    type: String,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("Room", roomSchema);
