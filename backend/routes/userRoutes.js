// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const upload = require("../middleware/imageUploadMiddleware");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post(
  "/upload-profile-image",
  upload.single("image"),
  UserController.uploadProfileImage
);
router.get("/:userId/cart", UserController.getCart);

module.exports = router;
