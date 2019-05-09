/**
 * Description: Services page style
 * Date: 4/26/2019
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
const profileStyles = {
  ...commonStyle,
  card: {
    minHeight: '30vh',
    margin: '0',
  },
  avatar: {
    minWidth: '130px', 
    minHeight: '130px', 
    width: '130px', 
    height: '130px'
  },
  description: {
    color: "#999999"
  },
};
export default profileStyles;
