const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  occupancy: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  location: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
  photo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
