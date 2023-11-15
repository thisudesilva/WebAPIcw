import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar, FaMoneyBillAlt } from "react-icons/fa";
import ActivityCard from "../components/ActivityCard";

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStarRating, setFilterStarRating] = useState(null);
  const [filterPrice, setFilterPrice] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        // Perform API call to fetch all activities
        const response = await axios.get(
          "http://localhost:3001/api/activities"
        );
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    // Apply filters when filterStarRating or filterPrice changes
    const applyFilters = () => {
      let filtered = activities;

      if (filterStarRating) {
        filtered = filtered.filter(
          (activity) => activity.starRating === filterStarRating
        );
      }

      if (filterPrice) {
        filtered = filtered.filter((activity) => activity.price <= filterPrice);
      }

      setFilteredActivities(filtered);
    };

    applyFilters();
  }, [activities, filterStarRating, filterPrice]);

  return (
    <div className="container mx-auto mt-8 ">
      <div className="w-full h-[125px] rounded-lg bg-gray-600 mb-[50px] "></div>
      <div className="mb-4 flex justify-between items-center relative">
        {/* Star Rating Filter */}
        <div className="flex items-center ">
          <FaStar className="mr-2" />
          <select
            onChange={(e) => setFilterStarRating(Number(e.target.value))}
            value={filterStarRating || ""}
          >
            <option value="">Filter by Star Rating</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Stars
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="flex items-center">
          <FaMoneyBillAlt className="mr-2" />
          <select
            onChange={(e) => setFilterPrice(Number(e.target.value))}
            value={filterPrice || ""}
          >
            <option value="">Filter by Price</option>
            {[1000, 2000, 3000, 4000, 5000, 6000].map((price) => (
              <option key={price} value={price}>
                Less than LKR {price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading && <p>Loading...</p>}
        {!loading && filteredActivities.length === 0 && (
          <p>No activities found.</p>
        )}
        {!loading &&
          filteredActivities.length > 0 &&
          filteredActivities.map((activity) => (
            <Link key={activity._id} to={`/activities/${activity._id}`}>
              <ActivityCard activity={activity} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
