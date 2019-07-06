/**
 * Description: Social Marketing Page Style
 * Date: 7/5/2019
 */

import {
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

const socialMarketingStyle = {
  cardProductTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
    textAlign: "center"
  },
  cardProductDesciprion: {
    textAlign: "center",
    color: "#999999"
  },
  stats: {
    color: "#999999",
    fontSize: "12px",
    lineHeight: "22px",
    textAlign: 'right',
    width: '100%',
    "& svg": {
      position: "relative",
      top: "4px",
      width: "16px",
      height: "16px",
      marginRight: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "4px",
      fontSize: "16px",
      marginRight: "3px"
    }
  }
};

export default socialMarketingStyle;
