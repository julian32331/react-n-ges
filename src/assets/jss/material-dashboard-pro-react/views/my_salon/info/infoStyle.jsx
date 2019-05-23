/**
 * Description: Info page style
 * Date: 4/25/2019
 */

import {
  infoColor,
} from "assets/jss/material-dashboard-pro-react.jsx";
import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const infoStyle = {
    ...commonStyle,
    ...customCheckboxRadioSwitch,
    card1: {
      minHeight: '30vh',
      margin: '0',
    },
    card2: {
      minHeight: '30vh'
    },
    img: {
      width: '200px', 
      height: '200px', 
      border: 'solid 1px', 
      borderRadius: '8px', 
      padding: '8px'
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
  
export default infoStyle;