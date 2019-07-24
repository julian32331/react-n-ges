/**
 * Description: Dashboard Style
 * Date: 12/21/2018
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import topLeft from "assets/img/top_left.png";
import topRight from "assets/img/top_right.png";
import bottomLeft from "assets/img/bottom_left.png";
import bottomRight from "assets/img/bottom_right.png";

const dashboardStyle = theme => ({
  ...commonStyle,
  cardContent: {
    position: "relative",
    backgroundImage: "url(" + topLeft + "), url(" + topRight + "), url(" + bottomRight + "), url(" + bottomLeft + ")",
    backgroundPosition: "left top, right top, right bottom, left bottom", 
    backgroundSize: '20% auto',
    backgroundRepeat: "no-repeat"
  },
  container: {
    width: 'calc(60% + 30px)',
    textAlign: 'center',
    margin: 'auto',
    [theme.breakpoints.down("md")]: {
      width: '85%',
      padding: '40px 0'
    },
    [theme.breakpoints.down("xs")]: {
      width: '85%',
      padding: '30px 0'
    }
  },
  title: {
    padding: '90px 0 30px',
    lineHeight: '48px',
    fontSize: '40px',
    [theme.breakpoints.down("md")]: {
      padding: '50px 0 10px',
    },
    [theme.breakpoints.down("xs")]: {
      padding: '36px 0 0',
      fontSize: '20px',
      lineHeight: '24px',
      fontWeight: '600'
    }
  },
  content: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '40px',
    margin: '24px 0',
    [theme.breakpoints.down("xs")]: {
      fontSize: '16px',
      lineHeight: '20px',
      margin: '16px 0'
    }
  },
  px_30: {
    padding: '0 30px',
  },
  dashImg: {
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  }
});

export default dashboardStyle;
