/**
 * Description: Step style
 * Date: 2/7/2019
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const stepStyle = theme => ({
  ...customCheckboxRadioSwitch,
    infoText: {
      fontWeight: "300",
      margin: "10px 0 30px",
      textAlign: "center"
    }
});

export default stepStyle;