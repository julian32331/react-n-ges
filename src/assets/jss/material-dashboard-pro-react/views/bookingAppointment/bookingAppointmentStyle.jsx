import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";

const bookingAppointmentStyle = {
    ...commonStyle,
    // ...buttonStyle,
    ...extendedTablesStyle,
    center: {
        textAlign: "center"
    },
    left: {
        textAlign: "left"
    },
};

export default bookingAppointmentStyle;