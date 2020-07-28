const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  telephone: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
