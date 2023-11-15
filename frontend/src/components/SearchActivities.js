import React, { useState } from "react";
import DestinationDropdown from "../components/DestinationDropdown";
import DateSelector from "../components/DateSelector";
import ActivityType from "../components/ActivityType";
import StarRating from "../components/StarRating";

const SearchActivities = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    date: "",
    type: "",
    starRating: "",
  });

  const handleChange = (key, value) => {
    setSearchParams((prevParams) => ({ ...prevParams, [key]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Call the onSearch prop with the current search parameters
    onSearch(searchParams);
  };

  return (
    <form className="h-[300px] bg-green-100 w-full lg:h-[70px] ">
      <div className="flex flex-col w-full h-full lg:flex-row">
        <div className="flex-1 border-r">
          <DestinationDropdown
            value={searchParams.destination}
            onChange={(value) => handleChange("destination", value)}
          />
        </div>
        <div className="flex-1 border-r">
          <DateSelector
            value={searchParams.date}
            onChange={(value) => handleChange("date", value)}
          />
        </div>
        <div className="flex-1 border-r">
          <ActivityType
            value={searchParams.type}
            onChange={(value) => handleChange("type", value)}
          />
        </div>
        <div className="flex-1 border-r">
          <StarRating
            value={searchParams.starRating}
            onChange={(value) => handleChange("starRating", value)}
          />
        </div>
        <button type="submit" onClick={handleClick} className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchActivities;
