import topLeft from "assets/img/top_left.png";
import topRight from "assets/img/top_right.png";
import bottomLeft from "assets/img/bottom_left.png";
import bottomRight from "assets/img/bottom_right.png";

const pagesStyle = theme => ({
  wrapper: {
    height: "auto",
    minHeight: "100vh",
    position: "relative",
    top: "0"
  },
  fullPage: {
    // padding: "120px 0",
    position: "relative",
    minHeight: "100vh",
    display: "flex!important",
    margin: "0",
    border: "0",
    color: "#fff",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      // minHeight: "fit-content!important"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
      border: "none !important"
    },
    // "&:before": {
    //   backgroundColor: "rgba(0, 0, 0, 0.65)"
    // },
    "&:before,&:after": {
      display: "block",
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      zIndex: "2"
    }
  },
  leaf1: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    backgroundImage: "url(" + topLeft + ")", 
    width: '400px', 
    height: '275px',
    [theme.breakpoints.down("xs")]: {
      width: '100px', 
      height: '100px',
    },
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  leaf2: {
    position: 'absolute', 
    top: 0, 
    right: 0, 
    backgroundImage: "url(" + topRight + ")", 
    width: '302px', 
    height: '226px',
    [theme.breakpoints.down("xs")]: {
      width: '100px', 
      height: '100px',
    },
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  leaf3: {
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    backgroundImage: "url(" + bottomRight + ")", 
    width: '370px', 
    height: '278px',
    [theme.breakpoints.down("xs")]: {
      width: '100px', 
      height: '100px',
    },
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom'
  },
  leaf4: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    backgroundImage: "url(" + bottomLeft + ")", 
    width: '305px', 
    height: '227px',
    [theme.breakpoints.down("xs")]: {
      width: '100px', 
      height: '100px',
    },
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom'
  }
});

export default pagesStyle;
