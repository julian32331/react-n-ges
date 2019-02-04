/**
 * Description: Dashboard style view routes
 * Date: 12/25/2018
 */

import Dashboard from "views/Dashboard/Dashboard.jsx";
import CreateSalon from "views/CreateSalon.jsx";
import SalongInformasjon from "views/MinSalong/SalongInformasjon.jsx";
import SalongService from "views/MinSalong/SalongService/SalongService.jsx";
import OpeningHours from "views/MinSalong/OpeningHours/OpeningHours.jsx";
import CheckInOut from "views/Personallister/CheckInOut/CheckInOut.jsx";
import MyEmployees from "views/Personallister/MyEmployees/MyEmployees.jsx";
import News from "views/Intranett/News.jsx";
import Contacts from "views/Intranett/Contacts/Contacts.jsx";

import Profile from "views/Profile/Profile.jsx";
import CompanyInformasjon from "views/CompanyInformasjon.jsx";
import MySalon from "views/MySalon/MySalon.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Home from "@material-ui/icons/Home";
import AlarmOn from "@material-ui/icons/AlarmOn";
import NewReleases from "@material-ui/icons/NewReleases";

var dashRoutes = [ 
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/companyInformasjon",
    name: "Company Information",
    component: CompanyInformasjon
  },
  {
    path: "/mySalon",
    name: "My Salon",
    component: MySalon
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
  // {
  //   path: "/createsalon",
  //   name: "Creat First Salon",
  //   icon: DashboardIcon,
  //   component: CreateSalon
  // },
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
        path: "/minsalong/salongService",
        name: "Salong Service",
        mini: "SS",
        component: SalongService
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
  // {
  //   collapse: true,
  //   path: "/intranett",
  //   name: "Intranett",
  //   state: "intranett",
  //   icon: NewReleases,
  //   views: [
  //     {
  //       path: "/intranett/news",
  //       name: "News",
  //       mini: "N",
  //       component: News
  //     },
  //     {
  //       path: "/intranett/faq",
  //       name: "FAQ",
  //       mini: "F",
  //     },
  //     {
  //       path: "/intranett/marketing",
  //       name: "Marketing",
  //       mini: "M",
  //     },
  //     {
  //       path: "/intranett/contacts",
  //       name: "Contacts",
  //       mini: "C",
  //       component: Contacts
  //     }
  //   ]
  // },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
