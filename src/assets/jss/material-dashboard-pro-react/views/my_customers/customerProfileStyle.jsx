/**
 * Description: Customer Profile Style
 * Date: 7/15/2019
 */

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

const myCustomersStyle = theme => ({
    ...commonStyle,
    ...customCheckboxRadioSwitch,
    ...extendedTablesStyle,
    ...customSelectStyle,
    pt_20: {
        paddingTop: '20px',
    },
    img: {
        width: '100px',
        height: '100px',
        minWidth: '100px',
        minHeight: '100px',
        borderRadius: '5px',
        border: 'solid 1px',
        padding: '4px',
        overflow: 'hidden',
        margin: '5px',
    },
    img_add: {
        width: '100px',
        height: '100px',
        minWidth: '100px',
        minHeight: '100px',
        padding: '25px',
        borderRadius: '5px',
        overflow: 'hidden',
        margin: '5px',
    },
    mr_8: {
        marginRight: '8px',
    }
});

export default myCustomersStyle;