const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
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
  totalAmount: {
    type: String,
    required: true,
  },
});

const booking = mongoose.model("bookings", bookingsSchema);

module.exports = booking;
