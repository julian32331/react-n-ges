/**
 * Description: All modal styles
 * Date: 12/27/2018
 */

import {
  dangerColor
} from "assets/jss/material-dashboard-pro-react.jsx";
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const commonModalStyle = theme => ({
  ...modalStyle(theme),
  ...customSelectStyle,
  center: {
    textAlign: "center"
  },
  left: {
    textAlign: "left"
  },
  danger: {
    color: dangerColor + "!important"
  },
  warning_icon: {
    fontSize: '72px'
  }
});

export default commonModalStyle;