// controllers/ActivityController.js
const Activity = require("../models/Activity");

const ActivityController = {
  searchActivities: async (req, res) => {
    try {
      const { destination, date, type, starRating, price } = req.query;

      // Construct the query based on provided criteria
      const query = {};
      if (destination) query.destination = destination;
      if (date) query.date = date;
      if (type) query.type = type;
      if (starRating) query.starRating = starRating;
      if (price) query.price = { $lte: price };

      const activities = await Activity.find(query);

      res.status(200).json(activities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getActivity: async (req, res) => {
    try {
      const activityId = req.params.id;

      const activity = await Activity.findById(activityId);

      if (!activity) {
        return res.status(404).json({ error: "Activity not found." });
      }

      res.status(200).json(activity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ActivityController;
