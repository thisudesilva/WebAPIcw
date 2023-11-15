// models/Booking.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: "Activity",
    required: true,
  },
  participants: {
    type: Number,
    required: true,
  },
  participantAges: {
    type: [Number],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  // Additional fields as needed
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
