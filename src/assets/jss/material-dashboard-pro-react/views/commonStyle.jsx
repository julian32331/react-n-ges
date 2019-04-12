/**
 * Description: Common Style
 * Date: 12/21/2018
 */
import {
  dangerColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const commonStyle = {
    card: {
      minHeight: '65vh',
      margin: '0',
    },
    cardTitle: {
      marginTop: "0",
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
    },

    // loading styles
    loading_container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    loading: {
      color: '#7da8ae'
    },

    danger: {
      color: dangerColor + "!important"
    },
    center: {
      textAlign: 'center'
    },
    right: {
      textAlign: 'right'
    },
  };
  
export default commonStyle;
  