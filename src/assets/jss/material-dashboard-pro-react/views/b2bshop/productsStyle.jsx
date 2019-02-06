/**
 * Description: Products Style
 * Date: 2/6/2019
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

const productsStyle = theme => ({
  ...commonStyle,
  ...extendedTablesStyle,
  imgContainer: {
    width: '60px'
  }
});

export default productsStyle;