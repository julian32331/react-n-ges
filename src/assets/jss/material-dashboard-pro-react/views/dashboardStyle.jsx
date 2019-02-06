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
    minHeight: "70vh",
    backgroundImage: "url(" + topLeft + "), url(" + topRight + "), url(" + bottomRight + "), url(" + bottomLeft + ")",
    backgroundPosition: "left top, right top, right bottom, left bottom", 
    backgroundSize: '20% auto',
    backgroundRepeat: "no-repeat"
  },
  text_center: {
    textAlign: 'center'
  },
  spinner_container: {
    position: 'absolute',
    top: '50%',
    left: '42%',
    transform: 'translate(-50%, -50%)'
  }
});

export default dashboardStyle;
