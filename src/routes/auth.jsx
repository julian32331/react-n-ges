/**
 * Description: Auth style view routes
 * Date: 3/23/2019
 */

import Login from "views/auth/Login.jsx";
import Register from "views/auth/Register.jsx";
import ForgotPassword from "views/auth/ForgotPassword.jsx";
import ResetPassword from "views/auth/ResetPassword.jsx";

const authRoutes = [
  {
    path: "/login",
    name: "Login",
    short: "Login",
    mini: "L",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    short: "Register",
    mini: "R",
    component: Register
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    short: "ForgotPassword",
    mini: "FP",
    component: ForgotPassword
  },
  {
    path: "/resetpassword/:token",
    name: "ResetPassword",
    short: "ResetPassword",
    mini: "RP",
    component: ResetPassword
  }
];

export default authRoutes;
