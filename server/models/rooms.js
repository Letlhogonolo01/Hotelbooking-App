const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priceperroom: {
    type: Number,
    required: true,
  }
} , {
    timestamps: true,
  
});

const Room = mongoose.model("Rooms", roomSchema);

module.exports = Room;
