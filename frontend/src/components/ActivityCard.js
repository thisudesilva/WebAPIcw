import React from "react";
import { Link } from "react-router-dom";
import { FaRegCalendar, FaMapMarkerAlt, FaMoneyBillAlt } from "react-icons/fa";

const ActivityCard = ({ activity }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full h-40 object-cover hover:scale-110 transition-all duration-300"
        src={activity.image}
        alt={activity.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{activity.name}</div>
        <div className="flex mb-2 items-center">
          <FaMapMarkerAlt className="mr-2" />
          <span>{activity.destination}</span>
        </div>
        <div className="flex mb-2 items-center">
          <FaMoneyBillAlt className="mr-2" />
          <span>LKR {activity.price.toFixed(2)}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <Link
          to={`/activities/${activity._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Reserve Now
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
