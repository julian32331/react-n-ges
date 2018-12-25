/**
 * Description: Dashboard style view routes
 * Date: 12/25/2018
 * Author: Danijel
 */

import Dashboard from "views/Dashboard/Dashboard.jsx";
import SalongInformasjon from "views/MinSalong/SalongInformasjon.jsx";
import SaloonService from "views/MinSalong/SalongService/SaloonService.jsx";
import OpeningHours from "views/MinSalong/OpeningHours/OpeningHours.jsx";
import CheckInOut from "views/Personallister/CheckInOut/CheckInOut.jsx";
import MyEmployees from "views/Personallister/MyEmployees/MyEmployees.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Home from "@material-ui/icons/Home";
import AlarmOn from "@material-ui/icons/AlarmOn";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    collapse: true,
    path: "/minsalong",
    name: "Min salong",
    state: "openMinSalong",
    icon: Home,
    views: [
      {
        path: "/minsalong/salongInformasjon",
        name: "Salong Informasjon",
        mini: "SI",
        component: SalongInformasjon
      },
      {
        path: "/minsalong/saloonService",
        name: "Saloon Service",
        mini: "SS",
        component: SaloonService
      },
      {
        path: "/minsalong/openingHours",
        name: "Opening Hours",
        mini: "OH",
        component: OpeningHours
      }
    ]
  },
  {
    collapse: true,
    path: "/personallister",
    name: "Personallister",
    state: "personallister",
    icon: AlarmOn,
    views: [
      {
        path: "/personallister/checkInOut",
        name: "Check In/Out",
        mini: "CIO",
        component: CheckInOut
      },
      {
        path: "/personallister/myEmployees",
        name: "My Employees",
        mini: "ME",
        component: MyEmployees
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
