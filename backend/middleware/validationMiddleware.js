const validateBooking = (req, res, next) => {
  try {
    const { participants, participantAges } = req.body;

    // Validate participants and ages
    if (
      !participants ||
      !participantAges ||
      participants <= 0 ||
      participants !== participantAges.length
    ) {
      return res
        .status(400)
        .json({
          error:
            "Invalid booking details. Please provide a valid number of participants and corresponding ages.",
        });
    }

    // Additional validation as needed

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  validateBooking,
};
