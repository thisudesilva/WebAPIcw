// controllers/BookingController.js
const Booking = require("../models/Booking");
const Activity = require("../models/Activity");

const BookingController = {
  addToCart: async (req, res) => {
    try {
      const { userId, activityId, participants, participantAges } = req.body;

      // Validate participants and participantAges
      if (!Number.isInteger(participants) || participants <= 0) {
        return res
          .status(400)
          .json({ error: "Invalid number of participants." });
      }

      if (
        !Array.isArray(participantAges) ||
        participantAges.length !== participants
      ) {
        return res.status(400).json({ error: "Invalid participant ages." });
      }

      // Retrieve the activity
      const activity = await Activity.findById(activityId);

      if (!activity) {
        return res.status(404).json({ error: "Activity not found." });
      }

      // Calculate total price based on the number of participants and activity price
      const totalPrice = participants * activity.price;

      // Create a new booking
      const newBooking = new Booking({
        user: userId,
        activity: activityId,
        participants,
        participantAges,
        totalPrice,
      });

      await newBooking.save();

      res.status(201).json({ message: "Activity added to cart successfully." });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
      } else if (error.code === 11000) {
        return res.status(400).json({ error: "Duplicate key error." });
      } else {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },

  getCart: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Retrieve the user's cart and populate the 'activity' field
      const cart = await Booking.find({ user: userId }).populate("activity");

      console.log("Cart Data:", cart); // Add this console log

      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = BookingController;
