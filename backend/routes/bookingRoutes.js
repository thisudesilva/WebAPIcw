// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/BookingController");

// Define routes for booking-related operations
router.post("/add-to-cart", BookingController.addToCart);
router.get("/cart/:userId", BookingController.getCart); // Add this route for getting the cart

module.exports = router;
