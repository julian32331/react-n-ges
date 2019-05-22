/**
 * Description: App routes
 * Date: 12/25/2018
 */

import Booking from "layouts/Booking.jsx";
import InternalBooking from "layouts/InternalBooking.jsx";
import Auth from "layouts/Auth.jsx";
import Dashboard from "layouts/Dashboard.jsx";

var indexRoutes = [
  { path: "/booking/:salonId?/:consumerId?", name: "Booking", component: Booking },
  { path: "/salonbooking/:salonId?/:consumerId?", name: "InternalBooking", component: InternalBooking },
    
  { path: "/login", name: "Auth", component: Auth },
  { path: "/register", name: "Auth", component: Auth },
  { path: "/forgotpassword", name: "Auth", component: Auth },
  { path: "/resetpassword/:token", name: "Auth", component: Auth },
  
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;
