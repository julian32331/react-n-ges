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
    width: '75px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '0px !important',
    marginBottom: '0px !important',
  },
  qty: {
    width: '40px',
    textAlign: 'center',
    padding: '10px !important',
  },
  price: {
    marginTop: '0px',
    marginBottom: '0px',
  },
  pr_20: {
    paddingRight: '20px !important',
  },
  text_right: {
    textAlign: 'right'
  }
});

export default productsStyle;