/**
 * Description: Check In/Out style
 * Date: 4/30/2019
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

const checkStyle = {
  ...commonStyle,
  ...customCheckboxRadioSwitch,
  ...extendedTablesStyle,
  pb_0: {
    paddingBottom: '0',
  },
  pt_0: {
    paddingTop: '0',
  },
  pt_22: {
    paddingTop: '22px',
  }
};

export default checkStyle;