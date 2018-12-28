/**
 * Description: All modal styles
 * Date: 12/27/2018
 */

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
  }
});

export default commonModalStyle;