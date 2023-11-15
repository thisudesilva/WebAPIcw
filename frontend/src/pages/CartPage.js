import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cartActivities, setCartActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartActivities = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:3001/api/bookings/cart/${userId}`
        );

        setCartActivities(response.data);
      } catch (error) {
        console.error("Error fetching cart activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartActivities();
  }, []);

  useEffect(() => {
    console.log("Cart Activities:", cartActivities);
  }, [cartActivities]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Calculate total price on the frontend
  const totalPrice = cartActivities.reduce((acc, booking) => {
    return acc + booking.activity.price * booking.participants;
  }, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
      <div className="container flex-grow mx-auto mt-[200px]">
        <h2 className="mb-4 text-3xl font-semibold">Your Cart</h2>
        {cartActivities.map((booking) => (
          <div
            key={booking._id}
            className="p-6 mb-4 bg-white rounded-lg shadow-md"
          >
            <h3 className="mb-2 text-xl font-semibold">
              {booking.activity.name}
            </h3>
            <p className="mb-2 text-gray-600">
              Destination: {booking.activity.destination}
            </p>
            <p className="mb-2 text-gray-600">
              Date: {new Date(booking.activity.date).toLocaleDateString()}
            </p>
            <p className="mb-2 text-gray-600">Type: {booking.activity.type}</p>
            <p className="mb-2 text-gray-600">
              Price: ${booking.activity.price}
            </p>
            {/* Add other details like image, starRating, etc. */}
          </div>
        ))}
        {/* Display the total price */}
        <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-2 text-xl font-semibold">Total Price</h3>
          <p className="mb-2 text-gray-600">Total: ${totalPrice}</p>
        </div>
        {/* Proceed button */}
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default CartPage;
