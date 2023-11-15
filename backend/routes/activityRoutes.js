// routes/activityRoutes.js
const express = require("express");
const router = express.Router();
const ActivityController = require("../controllers/ActivityController");

// Define routes for activity-related operations
router.get("/", ActivityController.searchActivities);
router.get("/:id", ActivityController.getActivity);

module.exports = router;
