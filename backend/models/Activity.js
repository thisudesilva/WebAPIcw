// models/Activity.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["Adventure", "Sight Seeing", "Theme Park", "Tour"],
    required: true,
  },
  starRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Store the URL or path to the activity's image
  },
  ageRestrictions: {
    minAge: {
      type: Number,
      default: 0,
    },
    maxAge: {
      type: Number,
      default: 100,
    },
  },
  description: {
    type: String,
    required: true,
  },
  // Additional fields as needed
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
