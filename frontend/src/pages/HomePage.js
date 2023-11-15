import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchActivities from "../components/SearchActivities";
import ActivityCard from "../components/ActivityCard";
import HeroSlider from "../components/HeroSlider";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchActivities = async (searchParams) => {
    try {
      setLoading(true);
      // Perform API call to fetch search results based on searchParams
      const response = await axios.get("http://localhost:3001/api/activities", {
        params: searchParams,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    searchActivities({});
  }, []);

  return (
    <>
      <HeroSlider />
      <div className="container mx-auto relative ">
        <div
          className=" bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute
        lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12 "
        >
          <SearchActivities onSearch={searchActivities} />
        </div>
      </div>

      <div className="mt-20 mb-24 mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 gap-y-10">
        {loading && <p>Loading...</p>}
        {!loading && searchResults.length === 0 && <p>No results found.</p>}
        {!loading &&
          searchResults.length > 0 &&
          searchResults.map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}
      </div>
    </>
  );
};

export default HomePage;
