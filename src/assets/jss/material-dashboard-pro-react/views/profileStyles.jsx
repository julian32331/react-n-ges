import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
const profileStyles = {
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    "& small": {
      fontSize: "80%",
      fontWeight: "400"
    }
  },
  cardCategory: {
    marginTop: "10px",
    color: "#999999 !important",
    textAlign: "center"
  },
  description: {
    color: "#999999"
  },
  updateProfileButton: {
    float: "right"
  },
  submit: {
    float: 'right',
    marginBottom: '15px',
  }
};
export default profileStyles;
