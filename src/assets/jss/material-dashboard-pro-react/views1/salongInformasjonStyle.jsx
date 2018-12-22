/**
 * Description: Salong Informasjon Style
 * Date: 12/21/2018
 * Author: Danijel
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views1/commonStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const salongInformasjonStyle = {
    ...commonStyle,
    ...customCheckboxRadioSwitch,
    submit_container: {
      alignItems: 'flex-end !important',
      textAlign: 'right'
    },
    submit: {
      marginBottom: '15px',
    }
  };
  
export default salongInformasjonStyle;