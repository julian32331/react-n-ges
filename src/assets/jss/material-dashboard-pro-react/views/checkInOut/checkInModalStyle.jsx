/**
 * Description: Delete modal for saloon service Style
 * Date: 12/22/2018
 */

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const saloonModalStyle = theme => ({
  ...modalStyle(theme),
  ...customSelectStyle,
  center: {
    textAlign: "center"
  },
  text_left: {
    textAlign: "left"
  }
});

export default saloonModalStyle;