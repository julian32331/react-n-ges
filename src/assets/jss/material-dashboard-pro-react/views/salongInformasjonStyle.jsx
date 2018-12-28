/**
 * Description: Salong Informasjon Style
 * Date: 12/21/2018
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const salongInformasjonStyle = {
    ...commonStyle,
    ...customCheckboxRadioSwitch,
    submit: {
      float: 'right',
      marginBottom: '15px',
    }
  };
  
export default salongInformasjonStyle;