/**
 * Description: CustomToolbar style
 * Date: 4/26/2019
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";

const customToolbarStyle = {
    ...commonStyle,
    actionButton: {
      margin: "0 0 0 5px",
      padding: "5px",
      "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
        marginRight: "0px"
      }
    },
    actionButtonRound: {
      width: "auto",
      height: "auto",
      minWidth: "auto"
    },
    pb_15: {
        paddingBottom: '15px',
    },
    pl_0: {
        paddingLeft: '0px !important',
    },
    pr_0: {
        paddingRight: '0px !important',
    }
};

export default customToolbarStyle;