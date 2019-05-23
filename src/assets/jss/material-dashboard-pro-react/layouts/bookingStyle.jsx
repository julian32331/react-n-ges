/**
 * Description: Booking style
 * Date: 4/23/2019
 */

import {
  infoColor
} from "assets/jss/material-dashboard-pro-react.jsx";
import tl from "assets/img/booking/tl.png";
import tr from "assets/img/booking/tr.png";
import bl from "assets/img/booking/bl.png";

const bookingStyle = theme => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#F4F4F4',
    padding: '0 15%',
    backgroundImage: "url(" + tl + "), url(" + tr + "), url(" + bl + ")",
    backgroundPosition: "left top, right top, left bottom", 
    backgroundSize: '12% auto, 9% auto, 24% auto',
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {      
      padding: '0 16px',
    }
  },
  title: {
    color: '#485155',
    fontFamily: 'Merriweather',
    paddingBottom: '24px',
    borderBottomColor: '#80A0AB',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid'
  },
  content: {
    [theme.breakpoints.up("sm")]: {    
      minHeight: 'calc(100vh - 370px)',
      padding: '30px 0',
    },
    padding: '10px 0'
  },
  divider: {
    marginTop: '24px',
    borderBottomColor: '#80A0AB',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    [theme.breakpoints.down("sm")]: {     
      borderBottomColor: 'transparent',
    }
  },
  loading_container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    textAlign: 'center',
    padding: '30px 0',
  },
  loading: {
    color: '#7da8ae !important'
  },
  nowrap: {
    whiteSpace: 'nowrap'
  },
  right: {
    textAlign: "right"
  },
  center: {
    textAlign: "center"
  },
  positionAbsolute: {
    position: "absolute",
    right: "0",
    top: "0"
  },
  checkRoot: {
    padding: "12px 14px"
  },
  checked: {
    color: infoColor + "!important"
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "9px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },

  employee: {
    padding: '30px 0',
    margin: '0 -15px',
  },
  slide_container: {
    padding: '0 15px',
  },
  slide_img: {
    width: '100%',
    height: '300px',
    borderColor: '#245606',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '4px',
    [theme.breakpoints.down("sm")]: {      
      height: '80px',
    }
  },
  slide_name: {
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '16px',
    fontWeight: '500',
    [theme.breakpoints.down("sm")]: {      
      fontSize: '12px',
    }
  },
  icons: {
    width: "17px",
    height: "17px"
  },
  employeeName: {
    fontSize: '36px',
    fontFamily: 'Merriweather',
    textAlign: 'center',
    paddingTop: '24px',
    paddingBottom: '16px',
    [theme.breakpoints.down("sm")]: {     
      fontSize: '20px',
    }
  },
  employeeExpert: {
    fontSize: '20px',
    fontFamily: 'Source Sans Pro',
    color: '#D1B65C',
    textAlign: 'center'
  },

  date_time: {
    padding: '30px 0',
    margin: '0 -15px',
  },
  month_container: {
    textAlign: 'center',
    color: '#88A177',
    textTransform: 'uppercase',
    fontSize: '16px',
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
  },
  date_container: {
    cursor: 'pointer'
  },
  date: {
    color: '#80A0AB',
    fontSize: '36px',
    fontWeight: '900',
    fontFamily: 'Source Sans Pro',
    padding: '16px 0',
    lineHeight: '36px',
    textAlign: 'center'
  },
  date_dayPassed: {
    color: '#CFD9C9 !important'
  },
  dateActived: {
    color: '#88A177 !important',
    fontSize: '60px !important'
  },
  date_dayDisabled: {
    color: '#F9B2B2 !important'
  },
  day: {
    color: '#80A0AB',
    textAlign: 'center'
  },
  dayActived: {
    color: '#88A177 !important'
  },
  time_container: {    
    padding: '20px 10px',
  },
  time: {    
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'Source Sans Pro',
    color: '#fff',
    background: '#80A0AB',
    borderRadius: '4px'
  },
  timePassed: {
    background: '#CFD9C9 !important'
  },
  timeDisabled: {
    background: '#F9B2B2 !important'
  },
  timeActived: {
    background: '#88A177 !important'
  },

  iconRoot: {
    color: '#80A0AB !important'
  },
  textArea: {
    backgroundColor: '#fff'
  },
  multiline: {
    padding: '8px',
  },
  inputMultiline: {
    color: '#aaa',
    fontSize: '14px',
    fontFamily: "Roboto"
  }
});

export default bookingStyle;
