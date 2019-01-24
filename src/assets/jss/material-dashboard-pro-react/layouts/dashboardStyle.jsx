// ##############################
// // // App styles
// #############################

import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  containerFluid
} from "assets/jss/material-dashboard-pro-react.jsx";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    "&:after": {
      display: "table",
      clear: "both",
      content: '" "'
    }
  },
  mainPanel: {
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
    
    backgroundSize: "cover",
    backgroundPosition: "center center"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 70px)"
  },
  container: { ...containerFluid },
  map: {
    marginTop: "70px"
  },
  mainPanelSidebarMini: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerMiniWidth}px)`
    }
  },
  mainPanelWithPerfectScrollbar: {
    overflow: "hidden !important"
  },
  scrollTop: {
    position: 'fixed',
    bottom: '60px',
    right: '30px',
    width: '64px',
    // height: '64px',
    // padding: '16px',
    background: 'rgba(0, 0, 0, 0.15)',
    zIndex: '1031',
    borderRadius: '8px',
    textAlign: 'center',
}
});

export default appStyle;
