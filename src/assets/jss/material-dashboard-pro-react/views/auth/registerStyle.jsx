/**
 * Description: Register page style
 * Date: 4/23/2019
 */

import {
  container
} from "assets/jss/material-dashboard-pro-react.jsx";
import {
  dangerColor
} from "assets/jss/material-dashboard-pro-react.jsx";
import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const registerStyle = {
  ...commonStyle,
  ...customSelectStyle,
  container: {
    ...container,
    position: "relative",
    zIndex: "3"
  },
  cardSignup: {
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    marginBottom: "50px",
    padding: "40px 0px",
    marginTop: "5vh"
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
  link: {
    color: "#7da8ae",
    fontWeight: "400",
    fontFamily: "Source Sans Pro",
    "&:hover": {      
      color: "#7da8ae",
    },    
    "&:focus": {      
      color: "#7da8ae",
    }
  },
  w_100_p: {
    width: '100%'
  },
  pb_0: {
    paddingBottom: '0',
  },
  pt_15: {
    paddingTop: '15px',
  },
  danger: {
    color: dangerColor + "!important"
  }
};

export default registerStyle;
