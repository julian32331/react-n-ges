/**
 * Description: Page style view routes
 * Date: 12/25/2018
 */

import LoginPage from "views/Login/LoginPage.jsx";
import RegisterPage from "views/Register/RegisterPage.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";

const pagesRoutes = [
  {
    path: "/login",
    name: "Login",
    short: "Login",
    mini: "L",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    path: "/register",
    name: "Register",
    short: "Register",
    mini: "R",
    icon: PersonAdd,
    component: RegisterPage
  },
];

export default pagesRoutes;
