// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ActivityDetails from "./components/ActivityDetails";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;

// src/App.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// const App = () => {
//   const [activities, setActivities] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     // Fetch activities from your backend API
//     axios
//       .get("http://localhost:3001/api/activities")
//       .then((response) => {
//         setActivities(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching activities:", error);
//       });
//   }, []);

//   const addToCart = (activityId) => {
//     // Fetch the details of the selected activity
//     axios
//       .get(`http://localhost:3001/api/activities/${activityId}`)
//       .then((response) => {
//         const activityData = response.data;

//         // Simulate a request to the backend
//         // In a real application, you would use a library like axios to make API calls
//         // and handle authentication to get the actual userId
//         const userId = localStorage.getItem("userId");

//         // Add the activity to the cart with additional details
//         axios
//           .post("http://localhost:3001/api/bookings/add-to-cart", {
//             userId,
//             activityId,
//             participants: 2,
//             participantAges: [25, 30], // Add real participant ages
//           })
//           .then((response) => {
//             console.log(response.data.message);
//             // Update the local state if needed
//             setCart([
//               ...cart,
//               {
//                 userId,
//                 ...activityData,
//                 participants: 2,
//                 totalPrice: 2 * activityData.price,
//               },
//             ]);
//           })
//           .catch((error) => {
//             console.error("Error adding to cart:", error);
//           });
//       })
//       .catch((error) => {
//         console.error("Error fetching activity details:", error);
//       });
//   };

//   // Calculate the sum total of all activities in the cart
//   const totalAmount = cart.reduce((total, item) => total + item.totalPrice, 0);

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {activities.map((activity) => (
//           <div
//             key={activity._id}
//             className="max-w-md mx-auto bg-white rounded overflow-hidden shadow-md mb-4"
//           >
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{activity.name}</h2>
//               <p className="text-sm mb-2">
//                 Destination: {activity.destination}
//               </p>
//               <p className="text-sm mb-2">Date: {activity.date}</p>
//               <p className="text-sm mb-2">Type: {activity.type}</p>
//               <p className="text-sm mb-2">Price: ${activity.price}</p>
//               <button
//                 className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//                 onClick={() => addToCart(activity._id)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
//         {cart.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div>
//             <ul>
//               {cart.map((item, index) => (
//                 <li key={index} className="mb-2">
//                   Activity: {item.name}, Participants: {item.participants},
//                   Total Price: ${item.totalPrice}
//                 </li>
//               ))}
//             </ul>
//             <p className="text-xl font-semibold mt-4">
//               Total Amount: ${totalAmount}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
