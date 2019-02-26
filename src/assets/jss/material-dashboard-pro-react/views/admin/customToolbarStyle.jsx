import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

const adminStyle = {
    ...buttonStyle,
    ...extendedTablesStyle,
    center: {
        textAlign: "center"
    },
    left: {
        textAlign: "left"
    },
    py_15: {
        padding: "15px 0",
    },
    pl_0: {
        paddingLeft: '0px !important',
    },
    pr_0: {
        paddingRight: '0px !important',
    }
};

export default adminStyle;