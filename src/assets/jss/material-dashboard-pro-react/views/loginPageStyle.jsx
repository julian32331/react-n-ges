/**
 * Description: Login page style
 * Date: 23/12/2018
 */

import {
  container
} from "assets/jss/material-dashboard-pro-react.jsx";
import {
  dangerColor
} from "assets/jss/material-dashboard-pro-react.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const loginPageStyle = {
  ...customSelectStyle,
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
    marginTop: "10vh"
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
  right: {
    textAlign: "right"
  },
  link: {
    color: "#00acc1",
    fontWeight: "400",
    "&:hover": {      
      color: "#00acc1",
    },    
    "&:focus": {      
      color: "#00acc1",
    }
  },
  w_100_p: {
    width: '100%'
  },
  pb_0: {
    paddingBottom: '0',
  },
  pb_15: {
    paddingBottom: '15px',
  },
  pt_15: {
    paddingTop: '15px',
  },
  spinner_container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  danger: {
    color: dangerColor + "!important"
  }
};

export default loginPageStyle;
