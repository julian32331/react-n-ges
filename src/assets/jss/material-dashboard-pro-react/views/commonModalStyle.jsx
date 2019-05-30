/**
 * Description: All modal styles
 * Date: 12/27/2018
 */

import {
  dangerColor,
  infoColor,
  successColor,
} from "assets/jss/material-dashboard-pro-react.jsx";
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const commonModalStyle = theme => ({
  ...modalStyle(theme),
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  left: {
    textAlign: "left"
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: 'right'
  },
  lowercase: {
    textTransform: "lowercase"
  },
  success: {
    color: successColor + "!important"
  },
  danger: {
    color: dangerColor + "!important"
  },
  warning_icon: {
    fontSize: '72px'
  },
  formControl: {
    marginBottom: '20px',
    paddingTop: '5px'
  },
  switchIconChecked: {
    borderColor: infoColor,
    transform: "translateX(0px)!important"
  },
  switchChecked: {
    "& + $switchBar": {
      backgroundColor: infoColor + " !important"
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '0px !important',
    marginBottom: '0px !important',
  },
  qty: {
    width: '50px',
    textAlign: 'center',
    padding: '10px 10px 10px 24px !important',
  },
  py_15: {
    paddingTop: '15px',
    paddingBottom: '15px',
  }
});

export default commonModalStyle;