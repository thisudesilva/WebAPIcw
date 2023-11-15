import React from "react";

const DestinationDropdown = ({ value, onChange }) => {
  // Fetch destinations from the API or use a predefined list
  const destinations = [
    "Hanwella",
    "Ella",
    "Kitulgala",
    "Sigiriya",
    "Kandy",
    "Kaluaggala",
    "Bandaragama",
    "JaEla",
    "NuwaraEliya",
    "Galle",
    "Anuradhapura",
  ];

  return (
    <div>
      <label htmlFor="destination">Destination:</label>
      <select
        className="w-full h-full"
        id="destination"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Destination</option>
        {destinations.map((destination) => (
          <option key={destination} value={destination}>
            {destination}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DestinationDropdown;
