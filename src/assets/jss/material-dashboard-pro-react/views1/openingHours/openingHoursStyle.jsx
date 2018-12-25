/**
 * Description: Opening hours Style
 * Date: 12/24/2018
 * Author: Danijel
 */

import {
    infoColor,
} from "assets/jss/material-dashboard-pro-react.jsx";
import commonStyle from "assets/jss/material-dashboard-pro-react/views1/commonStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

const openingHoursStyle = theme => ({
  ...commonStyle,
  ...customCheckboxRadioSwitch,
  ...extendedTablesStyle,
  switchIconChecked: {
    borderColor: infoColor,
    transform: "translateX(0px)!important"
  },
  switchChecked: {
    "& + $switchBar": {
      backgroundColor: infoColor + " !important"
    }
  },
  text_right: {
      textAlign: 'right'
  }
});

export default openingHoursStyle;