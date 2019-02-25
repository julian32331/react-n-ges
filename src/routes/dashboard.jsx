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
import Booking from "views/Booking/Booking.jsx";
import Admin from "views/Admin/Admin.jsx";
import Dnd from "views/Admin/Dnd.jsx";
import News from "views/Intranett/News.jsx";
import Contacts from "views/Intranett/Contacts/Contacts.jsx";
import Products from "views/B2BShop/Products/Products.jsx";
import ShoppingCart from "views/B2BShop/ShoppingCart/ShoppingCart.jsx";
import Orders from "views/B2BShop/Orders/Orders.jsx";

import Profile from "views/Profile/Profile.jsx";
import CompanyInformasjon from "views/CompanyInformasjon.jsx";
import MySalon from "views/MySalon/MySalon.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Home from "@material-ui/icons/Home";
import AlarmOn from "@material-ui/icons/AlarmOn";
import NewReleases from "@material-ui/icons/NewReleases";
import Shop from "@material-ui/icons/Shop";
import DateRange from "@material-ui/icons/DateRange";

export var dashRoutes1 = [ 
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
    name: "Översikt",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    collapse: true,
    path: "/minsalong",
    name: "Min Salong",
    state: "openMinSalong",
    icon: Home,
    views: [
      {
        path: "/minsalong/salongInformasjon",
        name: "Salongsinformation",
        mini: "SI",
        component: SalongInformasjon
      },
      {
        path: "/minsalong/salongService",
        name: "Salongstjänster",
        mini: "SS",
        component: SalongService
      },
      {
        path: "/minsalong/openingHours",
        name: "Öppettider",
        mini: "O",
        component: OpeningHours
      }
    ]
  },
  {
    collapse: true,
    path: "/personallister",
    name: "Personalliggare",
    state: "personallister",
    icon: AlarmOn,
    views: [
      {
        path: "/personallister/checkInOut",
        name: "Checka in/ut",
        mini: "CIU",
        component: CheckInOut
      },
      {
        path: "/personallister/myEmployees",
        name: "Mina anställda",
        mini: "MA",
        component: MyEmployees
      }
    ]
  },
  {
    path: "/booking/:salonId?/:consumerId?",
    name: "Booking",
    icon: DateRange,
    component: Booking,
    // isDev: true
  },
  {
    path: "/admin",
    name: "Admin",
    icon: DateRange,
    component: Admin,
    // component: Dnd,
    // isDev: true
  },
  {
    collapse: true,
    path: "/b2bshop",
    name: "B2B Shop",
    state: "b2bshop",
    icon: Shop,
    // isDev: true,
    views: [
      {
        path: "/b2bshop/products",
        name: "Products",
        mini: "P",
        component: Products
      },
      {
        path: "/b2bshop/cart",
        name: "Shopping Cart",
        mini: "SC",
        component: ShoppingCart
      },
      {
        path: "/b2bshop/orders",
        name: "Orders",
        mini: "O",
        component: Orders
      }
    ]
  },
  {
    collapse: true,
    path: "/intranett",
    name: "Intranett",
    state: "intranett",
    icon: NewReleases,
    isDev: true,
    views: [
      {
        path: "/intranett/news",
        name: "News",
        mini: "N",
        component: News
      },
      {
        path: "/intranett/faq",
        name: "FAQ",
        mini: "F",
      },
      {
        path: "/intranett/marketing",
        name: "Marketing",
        mini: "M",
      },
      {
        path: "/intranett/contacts",
        name: "Contacts",
        mini: "C",
        component: Contacts
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];

export var dashRoutes2 = [  
  {
    path: "/createsalon",
    name: "Creat First Salon",
    icon: Home,
    component: CreateSalon
  },
  { redirect: true, path: "/", pathTo: "/createsalon", name: "Creat First Salon" }
]
// export default dashRoutes;
