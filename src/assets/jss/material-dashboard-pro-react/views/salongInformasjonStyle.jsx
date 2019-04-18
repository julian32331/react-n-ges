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
    },
    
    selectLabel: {
      // fontSize: "12px",
      fontSize: "14px",
      // textTransform: "uppercase",
      // color: "#3C4858 !important",
      color: "rgba(0, 0, 0, 0.54) !important",
      top: "8px"
    },
    pt_8: {
      paddingTop: '8px !important',
    }
  };
  
export default salongInformasjonStyle;