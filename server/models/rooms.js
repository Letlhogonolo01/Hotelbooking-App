const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  checkin: {
    type: String,
    required: true,
  },
  checkout: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model("Rooms", roomsSchema);

module.exports = Room;
