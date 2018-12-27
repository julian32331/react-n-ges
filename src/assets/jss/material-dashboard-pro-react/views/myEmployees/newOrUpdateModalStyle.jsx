/**
 * Description: Delete modal for my employees Style
 * Date: 12/27/2018
 * Author: Danijel
 */

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const newOrUpdateModalStyle = theme => ({
  ...modalStyle(theme),
  ...customSelectStyle,
  center: {
    textAlign: "center"
  },
  text_left: {
    textAlign: "left"
  }
});

export default newOrUpdateModalStyle;