/**
 * Description: Delete modal for saloon service Style
 * Date: 12/22/2018
 * Author: Danijel
 */

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

const salongModalStyle = theme => ({
  ...modalStyle(theme),
  modalBody: {
    position: 'relative',
    overflow: 'visible',
    paddingTop: '16px',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingBottom: '16px',
  },
  center: {
    textAlign: "center"
  },
});

export default salongModalStyle;