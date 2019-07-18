/**
 * Description: My Customers Page
 * Date: 7/15/2019
 */

import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import PictureUpload from "components/CustomUpload/PictureUpload.jsx";

import customerProfileStyle from "assets/jss/material-dashboard-pro-react/views/my_customers/customerProfileStyle";

import AddImage from "assets/img/add.png";

class CustomerProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            tabIndex        : 1,

            name            : "",
            nameState       : "",
            email           : "",
            emailState      : "",
            phone           : "",
            phoneState      : ""
        };
    }

    componentWillMount() {
        this.props.getUser();
    }

    render() {
        const { classes } = this.props;

        return (
            <Card>
                <CardHeader className={classes.pb_0}>
                    <div className={classes.cardHeader}>
                        <GridContainer>
                            <GridItem xs={12} className={classes.center}>
                                <div className={classes.buttonGroup}>
                                    <Button color={this.state.tabIndex === 1? "info" : "default"} className={classes.firstButton} onClick={() => this.setState({tabIndex: 1})}>
                                        Profile
                                    </Button>
                                    <Button color={this.state.tabIndex === 2? "info" : "default"} className={classes.lastButton} onClick={() => this.setState({tabIndex: 2})}>
                                        Bookings
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </CardHeader>
                {
                    this.state.tabIndex === 1 &&
                        <CardBody className={classes.pt_0}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={6} md={2}>
                                    <PictureUpload />
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={6}>
                                    <GridContainer>
                                        <GridItem xs={12} md={4}>
                                            <CustomInput
                                                // success={this.state.nameState === "success"}
                                                // error={this.state.nameState === "error"}
                                                labelText="Namn *"
                                                id="legal-name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    endAdornment:
                                                        this.state.nameState === "error" &&
                                                        <InputAdornment position="end">
                                                            <Warning className={classes.danger} />
                                                        </InputAdornment>,
                                                    onChange: event =>
                                                        this.changeForm(event, "name", "name", 1),
                                                    value: this.state.name,
                                                    type: "text"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} md={4}>
                                            <CustomInput
                                                success={this.state.orgNoState === "success"}
                                                error={this.state.orgNoState === "error"}
                                                labelText="E-post *"
                                                id="org-number"
                                                formControlProps={{
                                                fullWidth: true
                                                }}
                                                inputProps={{
                                                    onChange: event =>
                                                        this.changeForm(event, "orgNo", "orgNo", 1),
                                                    value: this.state.orgNo,
                                                    type: "text"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} md={4}>
                                            <CustomInput
                                                success={this.state.orgNoState === "success"}
                                                error={this.state.orgNoState === "error"}
                                                labelText="Personnummer"
                                                id="org-number"
                                                formControlProps={{
                                                fullWidth: true
                                                }}
                                                inputProps={{
                                                    onChange: event =>
                                                        this.changeForm(event, "orgNo", "orgNo", 1),
                                                    value: this.state.orgNo,
                                                    type: "number"
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>                        
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="employee"
                                            className={classes.selectLabel}
                                        >
                                            Select Employee
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select + " " + classes.text_left
                                            }}
                                            value={this.state.employee}
                                            onChange={this.handleEmployee}
                                            inputProps={{
                                                name: "employee",
                                                id: "employee"
                                            }}
                                        >
                                            <MenuItem
                                                disabled
                                                classes={{
                                                root: classes.selectMenuItem
                                                }}
                                            >
                                                Select Employee
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={6}>
                                    <TextField
                                        id="outlined-bare"
                                        className={classes.textArea}
                                        InputProps={{
                                            classes: {
                                                multiline: classes.multiline,
                                                inputMultiline: classes.inputMultiline
                                            },
                                            onChange: event => this.change(event, "comment", "comment", 1),
                                        }}
                                        multiline
                                        rows="4"
                                        fullWidth
                                        placeholder="Kommentar"
                                        margin="none"
                                        variant="outlined"
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center" className={classes.pt_20}>
                                <GridItem xs={12} sm={6} className={classes.center}>
                                    <img src={this.state.licensePreviewUrl} className={classes.img} alt="..." />
                                    <img src={this.state.licensePreviewUrl} className={classes.img} alt="..." />
                                    <img src={this.state.licensePreviewUrl} className={classes.img} alt="..." />
                                    <img src={this.state.licensePreviewUrl} className={classes.img} alt="..." />
                                    <img src={this.state.licensePreviewUrl} className={classes.img} alt="..." />
                                    <img src={this.state.licensePreviewUrl} className={classes.img} alt="..." />
                                    <img src={this.state.licensePreviewUrl} className={classes.img} alt="..." />
                                    
                                    <img src={AddImage} className={classes.img_add} alt="..." />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                }
                {
                    this.state.tabIndex === 2 &&
                        <CardBody className={classes.pt_0}>
                            <GridContainer>
                                <GridItem sm={12} md={6}>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6} md={4} lg={2}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Sök :
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6} lg={4}>
                                            <CustomInput
                                                id="search"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "search",
                                                    // onChange: event =>
                                                    //     this.searchHandler("search", event),
                                                    value: this.state.search
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </GridItem> 
                                <GridItem sm={12} md={6}>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6} md={4} lg={4}>
                                            <FormLabel className={classes.labelHorizontal}>
                                                Booking/Purchases :
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6} lg={4}>
                                            <FormControl fullWidth className={classes.pt_22}>
                                                <Datetime
                                                dateFormat={"YYYY-MM-DD"}
                                                timeFormat={false}
                                                // value={this.state.searchFrom}
                                                // onChange={event => this.timeHandler("searchFrom", event)}
                                                />
                                            </FormControl>
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>                               
                            </GridContainer>
                            <GridContainer>
                                {/* <GridItem xs={12} sm={2}>
                                    <Card>
                                        <CardHeader>
                                            <h3>Purchase #003</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <h4>Name: purchase1</h4>
                                            <h4>Date: 2019-7-17</h4>
                                            <h4>Price: $21</h4>
                                        </CardBody>
                                    </Card>
                                </GridItem> */}
                                <GridItem xs={12} sm={3}>
                                    <Card>
                                        <div className={classes.paypal}>
                                            <div className={classes.paypal_header}>
                                                <div className={classes.paypal_logo_wrapper}>
                                                    <img src="https://s32.postimg.org/8riyo788h/paypal.png" alt="Paypal" className={classes.paypal_logo} />
                                                </div>

                                                <div className={classes.paypal_header_info}>
                                                    <span className={classes.paypal_date}>25.04.2016</span>
                                                    <span className={classes.paypal_ref}>0f-113</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_subheader_wrapper}>
                                                <div className={classes.paypal_subheader}>
                                                    <h1 className={classes.paypal_username}>VladysLav, Hi</h1>
                                                    <span className={classes.paypal_help_text}>you've purchased three (3) items in our store:</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_cart}>
                                                <h2 className={classes.paypal_cart_title}>Cart:</h2>

                                                <ul className={classes.paypal_cart_list}>
                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>1</span>
                                                        <span className={classes.paypal_item_name}>t-Shirt Lacoste</span>
                                                        <span className={classes.paypal_item_price}>$48.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>2</span>
                                                        <span className={classes.paypal_item_name}>Snickers Nike</span>
                                                        <span className={classes.paypal_item_price}>$125.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>3</span>
                                                        <span className={classes.paypal_item_name}>All Stars</span>
                                                        <span className={classes.paypal_item_price}>$95.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_cart_total}>Total</span>
                                                        <span className={classes.paypal_item_price}>$268.00</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className={classes.paypal_footer}>
                                                <img src="https://s32.postimg.org/w4h06poc1/barcode.png" alt="Paypal Barcode" className={classes.paypal_barcode} />
                                            </div>
                                        </div>
                                    </Card>
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <Card>
                                        <div className={classes.paypal}>
                                            <div className={classes.paypal_header}>
                                                <div className={classes.paypal_logo_wrapper}>
                                                    <img src="https://s32.postimg.org/8riyo788h/paypal.png" alt="Paypal" className={classes.paypal_logo} />
                                                </div>

                                                <div className={classes.paypal_header_info}>
                                                    <span className={classes.paypal_date}>25.04.2016</span>
                                                    <span className={classes.paypal_ref}>0f-113</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_subheader_wrapper}>
                                                <div className={classes.paypal_subheader}>
                                                    <h1 className={classes.paypal_username}>VladysLav, Hi</h1>
                                                    <span className={classes.paypal_help_text}>you've purchased three (3) items in our store:</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_cart}>
                                                <h2 className={classes.paypal_cart_title}>Cart:</h2>

                                                <ul className={classes.paypal_cart_list}>
                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>1</span>
                                                        <span className={classes.paypal_item_name}>t-Shirt Lacoste</span>
                                                        <span className={classes.paypal_item_price}>$48.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>2</span>
                                                        <span className={classes.paypal_item_name}>Snickers Nike</span>
                                                        <span className={classes.paypal_item_price}>$125.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>3</span>
                                                        <span className={classes.paypal_item_name}>All Stars</span>
                                                        <span className={classes.paypal_item_price}>$95.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_cart_total}>Total</span>
                                                        <span className={classes.paypal_item_price}>$268.00</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className={classes.paypal_footer}>
                                                <img src="https://s32.postimg.org/w4h06poc1/barcode.png" alt="Paypal Barcode" className={classes.paypal_barcode} />
                                            </div>
                                        </div>
                                    </Card>
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <Card>
                                        <div className={classes.paypal}>
                                            <div className={classes.paypal_header}>
                                                <div className={classes.paypal_logo_wrapper}>
                                                    <img src="https://s32.postimg.org/8riyo788h/paypal.png" alt="Paypal" className={classes.paypal_logo} />
                                                </div>

                                                <div className={classes.paypal_header_info}>
                                                    <span className={classes.paypal_date}>25.04.2016</span>
                                                    <span className={classes.paypal_ref}>0f-113</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_subheader_wrapper}>
                                                <div className={classes.paypal_subheader}>
                                                    <h1 className={classes.paypal_username}>VladysLav, Hi</h1>
                                                    <span className={classes.paypal_help_text}>you've purchased three (3) items in our store:</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_cart}>
                                                <h2 className={classes.paypal_cart_title}>Cart:</h2>

                                                <ul className={classes.paypal_cart_list}>
                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>1</span>
                                                        <span className={classes.paypal_item_name}>t-Shirt Lacoste</span>
                                                        <span className={classes.paypal_item_price}>$48.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>2</span>
                                                        <span className={classes.paypal_item_name}>Snickers Nike</span>
                                                        <span className={classes.paypal_item_price}>$125.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>3</span>
                                                        <span className={classes.paypal_item_name}>All Stars</span>
                                                        <span className={classes.paypal_item_price}>$95.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_cart_total}>Total</span>
                                                        <span className={classes.paypal_item_price}>$268.00</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className={classes.paypal_footer}>
                                                <img src="https://s32.postimg.org/w4h06poc1/barcode.png" alt="Paypal Barcode" className={classes.paypal_barcode} />
                                            </div>
                                        </div>
                                    </Card>
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <Card>
                                        <div className={classes.paypal}>
                                            <div className={classes.paypal_header}>
                                                <div className={classes.paypal_logo_wrapper}>
                                                    <img src="https://s32.postimg.org/8riyo788h/paypal.png" alt="Paypal" className={classes.paypal_logo} />
                                                </div>

                                                <div className={classes.paypal_header_info}>
                                                    <span className={classes.paypal_date}>25.04.2016</span>
                                                    <span className={classes.paypal_ref}>0f-113</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_subheader_wrapper}>
                                                <div className={classes.paypal_subheader}>
                                                    <h1 className={classes.paypal_username}>VladysLav, Hi</h1>
                                                    <span className={classes.paypal_help_text}>you've purchased three (3) items in our store:</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_cart}>
                                                <h2 className={classes.paypal_cart_title}>Cart:</h2>

                                                <ul className={classes.paypal_cart_list}>
                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>1</span>
                                                        <span className={classes.paypal_item_name}>t-Shirt Lacoste</span>
                                                        <span className={classes.paypal_item_price}>$48.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>2</span>
                                                        <span className={classes.paypal_item_name}>Snickers Nike</span>
                                                        <span className={classes.paypal_item_price}>$125.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>3</span>
                                                        <span className={classes.paypal_item_name}>All Stars</span>
                                                        <span className={classes.paypal_item_price}>$95.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_cart_total}>Total</span>
                                                        <span className={classes.paypal_item_price}>$268.00</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className={classes.paypal_footer}>
                                                <img src="https://s32.postimg.org/w4h06poc1/barcode.png" alt="Paypal Barcode" className={classes.paypal_barcode} />
                                            </div>
                                        </div>
                                    </Card>
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <Card>
                                        <div className={classes.paypal}>
                                            <div className={classes.paypal_header}>
                                                <div className={classes.paypal_logo_wrapper}>
                                                    <img src="https://s32.postimg.org/8riyo788h/paypal.png" alt="Paypal" className={classes.paypal_logo} />
                                                </div>

                                                <div className={classes.paypal_header_info}>
                                                    <span className={classes.paypal_date}>25.04.2016</span>
                                                    <span className={classes.paypal_ref}>0f-113</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_subheader_wrapper}>
                                                <div className={classes.paypal_subheader}>
                                                    <h1 className={classes.paypal_username}>VladysLav, Hi</h1>
                                                    <span className={classes.paypal_help_text}>you've purchased three (3) items in our store:</span>
                                                </div>
                                            </div>

                                            <div className={classes.paypal_cart}>
                                                <h2 className={classes.paypal_cart_title}>Cart:</h2>

                                                <ul className={classes.paypal_cart_list}>
                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>1</span>
                                                        <span className={classes.paypal_item_name}>t-Shirt Lacoste</span>
                                                        <span className={classes.paypal_item_price}>$48.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>2</span>
                                                        <span className={classes.paypal_item_name}>Snickers Nike</span>
                                                        <span className={classes.paypal_item_price}>$125.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_index}>3</span>
                                                        <span className={classes.paypal_item_name}>All Stars</span>
                                                        <span className={classes.paypal_item_price}>$95.00</span>
                                                    </li>

                                                    <li className={classes.paypal_cart_item}>
                                                        <span className={classes.paypal_cart_total}>Total</span>
                                                        <span className={classes.paypal_item_price}>$268.00</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className={classes.paypal_footer}>
                                                <img src="https://s32.postimg.org/w4h06poc1/barcode.png" alt="Paypal Barcode" className={classes.paypal_barcode} />
                                            </div>
                                        </div>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                }
            </Card>
        );
    }
}

CustomerProfile.propTypes = {
  classes: PropTypes.object.isRequired
};
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser             : Actions.getUser
    }, dispatch);
}

export default withStyles(customerProfileStyle)(connect(null, mapDispatchToProps)(CustomerProfile));
