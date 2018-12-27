/**
 * Description: My employees Style
 * Date: 12/27/2018
 * Author: Danijel
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

const myEmployeesStyle = theme => ({
  ...commonStyle,
  ...customCheckboxRadioSwitch,
  ...extendedTablesStyle,
  text_right: {
      textAlign: 'right'
  },
  pb_0: {
    paddingBottom: '0',
  },
  pt_0: {
    paddingTop: '0',
  },
  pt_20: {
    paddingTop: '20px',
  },
  picture: {
    width: '40px',
    height: '40px',
    backgroundColor: '#999',
    border: '2px solid #ccc',
    color: '#fff',
    borderRadius: '50%',
    margin: 'auto',
    overflow: 'hidden',
  },
  picture_src: {
    width: '100%'
  }
});

export default myEmployeesStyle;