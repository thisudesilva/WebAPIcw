// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
  },
  cart: [
    {
      activityId: {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
      participants: Number,
      participantAges: [Number],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
