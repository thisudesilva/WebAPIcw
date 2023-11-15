import React from "react";

const DateSelector = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="date">Date:</label>
      <input
        className="w-full h-full"
        type="date"
        id="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateSelector;
