/**
 * Description: Saloon service Style
 * Date: 12/22/2018
 * Author: Danijel
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";

const salongServiceStyle = theme => ({
  ...commonStyle,
  text_right: {
      textAlign: 'right'
  },
  mb_20: {
    marginBottom: '20px',
  },
  bg_title: {
    background: '#dddddd',
    color: '#3C4858',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      borderBottomLeftRadius: '0',
    }
  },
  title_container: {
    padding: '15px 0',
    [theme.breakpoints.up('lg')]: {
      padding: '15px 20px'
    }
  },
  title: {
    fontSize: '24px', 
    fontWeight: '400'
  },
  time: {
    marginTop: '10px'
  },
  title_item: {
    fontSize: '16px', 
    fontWeight: '400'
  },
  price: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px'
    }
  },
  bg_content: {
    background: '#eeeeee',
    fontSize: '16px',
    paddingTop: '15px !important',
    paddingBottom: '15px !important'
  },
  py_15: {
    paddingTop: '10px',
    paddingBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0',
    }
  },
  btn_container: {
    background: '#eee', 
    textAlign: 'right',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      borderTopRightRadius: '0',
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px'
    }
  },
  btn_size: {
    [theme.breakpoints.up('md')]: {
      size: "sm"
    }
  },
  mx_10: {
    marginLeft: '10px',
    marginRight: '10px',
  },
});

export default salongServiceStyle;