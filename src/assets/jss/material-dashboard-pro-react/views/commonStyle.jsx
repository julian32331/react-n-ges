/**
 * Description: Common Style
 * Date: 12/21/2018
 */
import {
  dangerColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const commonStyle = {
    cardTitle: {
      marginTop: "0",
      marginBottom: "3px",
      color: "#3C4858",
    },
    cardHeader: {
      zIndex: "3",
      marginTop: "15px",
    },
    cardContent: {
      position: "relative",
      minHeight: "50vh",
    },
    danger: {
      color: dangerColor + "!important"
    }
  };
  
export default commonStyle;
  