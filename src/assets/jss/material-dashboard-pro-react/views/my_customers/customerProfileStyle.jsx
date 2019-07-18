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
    },
    pt_22: {
        paddingTop: '22px',
    },

    paypal: {
        position: 'relative',
        left: '50%',
        display: 'inline-block',
        maxWidth: '100%',
        width: 'auto',
        // margin: '50px auto 25px',
        padding: '20px 0',
        clear: 'both',
        transform: 'translateX(-50%)',
    },
    paypal_header: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '30px 30px 45px',
        background: '#fff',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    },
    paypal_logo_wrapper: {
        flex: '1 0 40%',
    },
    paypal_logo: {
        display: 'block',
        width: '50px',
        height: 'auto',
        marginLeft: '15px',
    },
    paypal_header_info: {
        flex: '1 0 50%',
    },
    paypal_date: {
        display: 'block',
        fontSize: '19px',
        color: '#aaa',
        fontWeight: '300',
        marginBottom: '5px',
    },    
    paypal_ref: {
        display: 'block',
        fontSize: '19px',
        color: '#aaa',
        fontWeight: '300',
    },
    paypal_subheader_wrapper: {
        background: '#fff',
        paddingBottom: '20px',
    },
    paypal_subheader: {
        padding: '0 45px 0 40px',
        borderLeft: '5px solid #029de0',
    },
    paypal_username: {
        margin: '0 0 10px 0',
        fontSize: '22px',
        fontWeight: '600',
    },
    paypal_help_text: {
        color: '#aaa',
        fontWeight: '300',
    },
    paypal_cart: {
        display: 'block',
        padding: '25px 30px 45px',
    },
    paypal_cart_title: {
        display: 'block',
        marginTop: '0',
        marginBottom: '25px',
        textAlign: 'center',
    },
    paypal_cart_list: {
        margin: '0',
        padding: '0 15px',
        listStyle: 'none',
    },
    paypal_cart_item: {
        display: 'block',
        paddingTop: '20px',
        marginBottom: '20px',
        borderTop: '2px dashed #aaa',
        fontSize: '18px',
        "&:first-child": {
            borderTopWidth: '0px',
        },
        "&:last-child": {
            marginBottom: 0,
            borderTop: '2px solid #FFE155',
        }
    },
    paypal_index: {
        paddingRight: '15px',
        color: '#aaa',
        fontWeight: '300',
    },
    paypal_item_name: {
        color: '#aaa',
        fontWeight: '300',
    },
    paypal_item_price: {
        float: 'right',
        letterSpacing: '1px',
    },
    paypal_cart_total: {
        fontSize: '20px',
        textTransform: 'uppercase',
    },
    paypal_footer: {
        position: 'relative',
        padding: '30px 20px',
        borderTop: '2px dashed #FF84A1',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        "&:before": {
            content: '',
            position: 'absolute',
            top: '0',
            border: '4px solid transparent',
            transform: 'translateY(calc(-50 % - 1px))',
            left: '0',
            borderLeft: '7px solid #ff85a1',
        },
        "&:after": {
            content: '',
            position: 'absolute',
            top: '0',
            border: '4px solid transparent',
            transform: 'translateY(calc(-50 % - 1px))',
            right: '0',
            borderRight: '7px solid #ff85a1',
        }
    },
    paypal_barcode: {
        display: 'block',
        margin: '0 auto',
        maxWidth: '300px',
        height: 'auto',
    }
});

export default myCustomersStyle;