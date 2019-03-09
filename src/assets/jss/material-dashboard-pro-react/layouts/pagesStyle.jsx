import topLeft from "assets/img/top_left.png";
import topRight from "assets/img/top_right.png";
import bottomLeft from "assets/img/bottom_left.png";
import bottomRight from "assets/img/bottom_right.png";
import bg from "assets/img/bg.png";

const pagesStyle = theme => ({
  wrapper: {
    height: "auto",
    minHeight: "100vh",
    position: "relative",
    top: "0",
    backgroundImage: 'url(' + bg + ')'
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
    },
    
    backgroundImage: "url(" + topLeft + "), url(" + topRight + "), url(" + bottomRight + "), url(" + bottomLeft + ")",
    backgroundPosition: "left top, right top, right bottom, left bottom", 
    backgroundSize: '20% auto',
    backgroundRepeat: "no-repeat"
  }
});

export default pagesStyle;
