import React from "react";

const StarRating = ({ value, onChange }) => {
  // Fetch star ratings from the API or use a predefined list
  const starRatings = [1, 2, 3, 4, 5];

  return (
    <div>
      <label htmlFor="starRating">Star Rating:</label>
      <select
        className="w-full h-full"
        id="starRating"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Star Rating</option>
        {starRatings.map((rating) => (
          <option key={rating} value={rating}>
            {rating} Stars
          </option>
        ))}
      </select>
    </div>
  );
};

export default StarRating;
