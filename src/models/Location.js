const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  parish: {
    type: String,
    required: true,
  },
  town_city: {
    type: String,
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
});

module.exports = mongoose.model("Location", locationSchema);
