/**
 * Description: Hours Style
 * Date: 4/29/2019
 */

import {
    infoColor,
} from "assets/jss/material-dashboard-pro-react.jsx";
import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

const hoursStyle = {
  ...commonStyle,
  ...customCheckboxRadioSwitch,
  ...extendedTablesStyle,
  card1: {
    minHeight: '30vh',
    margin: '0',
  },
  card2: {
    minHeight: '30vh'
  },
  switchIconChecked: {
    borderColor: infoColor,
    transform: "translateX(0px)!important"
  },
  switchChecked: {
    "& + $switchBar": {
      backgroundColor: infoColor + " !important"
    }
  }
};

export default hoursStyle;