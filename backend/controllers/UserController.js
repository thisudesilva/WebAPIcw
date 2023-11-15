// controllers/UserController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Bookings = require("../models/Booking");

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, email } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Include userName in the response
      const { _id, username: userName } = user;

      // Generate a JWT token
      const token = jwt.sign({ userId: _id, userName }, "your_secret_key", {
        expiresIn: "1h",
      });

      res.status(200).json({ token, userId: _id, userName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  uploadProfileImage: async (req, res) => {
    try {
      // Placeholder: Retrieve the user based on the logged-in user or the user ID from the request
      let user;

      // Example: If using session-based authentication, retrieve the user from the session
      if (req.session && req.session.user) {
        user = req.session.user;
      } else {
        // Example: If using token-based authentication, retrieve the user based on the user ID from the request
        const userId = req.params.userId; // Adjust based on your route structure
        user = await User.findById(userId);
      }

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      if (req.file) {
        // Placeholder: Store the URL or path to the uploaded image
        const imageUrl = `/uploads/${req.file.filename}`; // Adjust the path based on your file storage setup
        user.profileImage = imageUrl;
        await user.save();
        res
          .status(200)
          .json({ message: "Profile image uploaded successfully." });
      } else {
        res.status(400).json({ error: "No image file provided." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getCart: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      //const cartActivities = user.Booking || [];
      const cartActivities = await Bookings.find({ user: userId });

      res.status(200).json(cartActivities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
