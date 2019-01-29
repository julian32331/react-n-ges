/**
 * Description: Salon Style
 * Date: 12/21/2018
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";

const mySalonStyle = theme => ({
    ...commonStyle,
    salonContainer: {
      width: '100%',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',      
      [theme.breakpoints.up("sm")]: {
        margin: '0 30px 15px 30px',
      }
    },
    text_right: {
      textAlign: 'right'
    },
    mt_15: {
      marginTop: '15px',
    },
    mt_27: {
      marginTop: '27px',
    },
    left: {
      textAlign: 'left',
      borderTop: "none",
      borderBottom: "1px solid #ddd",
      paddingLeft: '30px !important',
    },
    right: {
      textAlign: 'right',
      borderTop: "none",
      borderBottom: "1px solid #ddd",
    }
  });
  
export default mySalonStyle;