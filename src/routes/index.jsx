/**
 * Description: App routes
 * Date: 12/25/2018
 */

import Pages from "layouts/Pages.jsx";
import Dashboard from "layouts/Dashboard.jsx";

var indexRoutes = [
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/login", name: "Pages", component: Pages },
  { path: "/register", name: "Pages", component: Pages },
  { path: "/resetpassword/:token", name: "Pages", component: Pages },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;
