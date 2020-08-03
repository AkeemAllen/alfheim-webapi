const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const amenitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Amenity", amenitySchema);
