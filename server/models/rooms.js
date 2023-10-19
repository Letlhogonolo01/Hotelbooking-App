const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema(
  {
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
    pricePerNight: {
        type: String,
        required: true,
      },
  },
);

const Rooms = mongoose.model("Rooms", roomsSchema);

module.exports = Rooms
