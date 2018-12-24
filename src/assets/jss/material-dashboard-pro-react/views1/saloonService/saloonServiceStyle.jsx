/**
 * Description: Saloon service Style
 * Date: 12/22/2018
 * Author: Danijel
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views1/commonStyle.jsx";
// import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

const saloonServiceStyle = theme => ({
  ...commonStyle,
  // ...modalStyle(theme),
  text_right: {
      textAlign: 'right'
  },
  mb_20: {
    marginBottom: '20px',
  },
  bg_title: {
    background: '#dddddd'
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
  bg_content: {
    background: '#eeeeee'
  },
  py_15: {
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  btn_container: {
    background: '#eee', 
    textAlign: 'right'
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
  // center: {
  //   textAlign: "center"
  // },
});

export default saloonServiceStyle;