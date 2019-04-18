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
    padding: '10px 10px 10px 24px !important',
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
  },

  cat_container: {
    minHeight: '50vh',
    maxHeight: '70vh',
    overflow: 'auto',
    padding: '8px',
    borderColor: '#ddd',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '8px'
  },
  child_1: {
    marginLeft: '12px',
    paddingRight: '36px',
  },
  child_2: {
    marginLeft: '24px',
    paddingRight: '36px',
  },
  child_3: {
    marginLeft: '36px',
    paddingRight: '36px',
  },
  actived_cat: {
    borderBottomColor: '#7da8ae',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid'
  },
  loading: {
    color: '#7da8ae !important'
  }
});

export default productsStyle;