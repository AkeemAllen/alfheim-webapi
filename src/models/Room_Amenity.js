const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const room_amenity_schema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amenity: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  includedInCost: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("RoomAmenity", room_amenity_schema);
