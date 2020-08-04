const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
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
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
