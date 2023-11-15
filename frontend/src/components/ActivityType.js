import React from "react";

const ActivityType = ({ value, onChange }) => {
  // Fetch activity types from the API or use a predefined list
  const activityTypes = ["Adventure", "Sight Seeing", "Theme Park", "Tour"];

  return (
    <div>
      <label htmlFor="activityType">Activity Type</label>
      <select
        className="w-full h-full"
        id="activityType"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Activity Type</option>
        {activityTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActivityType;
