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
      // marginBottom: "3px",
      color: "#434343",
      fontSize: '24px',
      fontFamily: 'Source Sans Pro',
      fontWeight: '700',
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
  