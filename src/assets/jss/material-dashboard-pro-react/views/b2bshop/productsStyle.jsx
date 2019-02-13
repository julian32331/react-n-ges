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
  },
  qty: {
    width: '50px',
    float: 'right'
  },
  pr_20: {
    paddingRight: '20px !important',
  }
});

export default productsStyle;