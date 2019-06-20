/**
 * Description: CustomToolbar style
 * Date: 4/26/2019
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const customToolbarStyle = {
    ...commonStyle,
    ...customSelectStyle,
    actionButton: {
      margin: "0 0 0 5px",
      padding: "5px",
      "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
        marginRight: "0px"
      }
    },
    actionButtonRound: {
      width: "auto",
      height: "auto",
      minWidth: "auto"
    },
    pb_15: {
        paddingBottom: '15px',
    },
    pl_0: {
        paddingLeft: '0px !important',
    },
    pr_0: {
        paddingRight: '0px !important',
    },
    marginRight: {
      marginRight: '5px',
    },
    label: {
      fontSize: '18px', 
      fontWeight: '500', 
      padding: '8px 0 7px', 
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
    }
};

export default customToolbarStyle;