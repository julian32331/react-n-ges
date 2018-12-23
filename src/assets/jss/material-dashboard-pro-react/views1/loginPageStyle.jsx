/**
 * Description: Login page style
 * Date: 23/12/2018
 * Author: Danijel
 */

import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

const loginPageStyle = {
  container: {
    ...container,
    position: "relative",
    zIndex: "3"
  },
  cardSignin: {
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    marginBottom: "100px",
    padding: "40px 0px",
    marginTop: "15vh"
  },
  center: {
    textAlign: "center"
  },
  form: {
    padding: "0 20px",
    position: "relative"
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  forgot_password: {
    textAlign: 'right',
    padding: '0 0 15px',
  },
  w_100_p: {
    width: '100%'
  },
  pb_0: {
    paddingBottom: '0',
  }
};

export default loginPageStyle;
