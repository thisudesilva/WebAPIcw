import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendar,
  FaMoneyBillAlt,
  FaStar,
} from "react-icons/fa";
import axios from "axios";

const ActivityDetails = () => {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [participants, setParticipants] = useState(1);
  const [participantAges, setParticipantAges] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/activities/${id}`
        );
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity details:", error);
        setError("Error fetching activity details");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  const handleReserveNow = async () => {
    console.log("Participants:", participants);
    console.log("Participant Ages:", participantAges);
    console.log("id", id);
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/bookings/add-to-cart",
        {
          activityId: id,
          participants,
          participantAges,
          userId,
        }
      );

      console.log("Add to Cart Response:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !activity) {
    return <p>{error || "Activity not found"}</p>;
  }

  return (
    <div className="container mx-auto mt-8 ">
      <div className="max-w-2xl p-8 mx-auto bg-white rounded-md shadow-md">
        <img
          className="object-cover w-full h-64 mb-8"
          src={activity.image}
          alt={activity.name}
        />
        <h2 className="mb-4 text-2xl font-bold">{activity.name}</h2>
        <p className="mb-4 text-gray-700">{activity.description}</p>

        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <span>{activity.destination}</span>
        </div>

        <div className="flex items-center mb-4">
          <FaCalendar className="mr-2" />
          <span>{new Date(activity.date).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center mb-4">
          <FaMoneyBillAlt className="mr-2" />
          <span>LKR {activity.price.toFixed(2)}</span>
        </div>

        <div className="flex items-center mb-4">
          <FaStar className="mr-2" />
          <span>{activity.starRating} Stars</span>
        </div>

        <div className="flex items-center mb-4">
          <strong>Age Restrictions:</strong> {activity.ageRestrictions.minAge} -{" "}
          {activity.ageRestrictions.maxAge} years
        </div>

        <div className="mb-4 text-red-600">
          <p>
            If the number of participants is more than 10, please contact us:
            <span className="ml-2">📞 011 0234 331</span>
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="participants">
            Number of Participants:
          </label>
          <input
            type="number"
            id="participants"
            value={participants}
            onChange={(e) =>
              setParticipants(Math.min(parseInt(e.target.value, 10), 10))
            }
            min="1"
            max="10"
            className="w-full p-2 border"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="participantAges">
            Age of Participants:
          </label>
          {Array.from({ length: participants }, (_, index) => (
            <input
              key={index}
              type="number"
              value={participantAges[index] || ""}
              onChange={(e) => {
                const newAges = [...participantAges];
                newAges[index] = parseInt(e.target.value, 10);
                setParticipantAges(newAges);
              }}
              min={activity.ageRestrictions.minAge}
              max={activity.ageRestrictions.maxAge}
              className="p-2 mr-2 border"
            />
          ))}
        </div>

        <button onClick={handleReserveNow} className="btn btn-primary">
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default ActivityDetails;
