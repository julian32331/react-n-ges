/**
 * Description: My Customers Page
 * Date: 7/15/2019
 */

import React from "react";
import PropTypes from "prop-types";

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

import customerProfileStyle from "assets/jss/material-dashboard-pro-react/views/myCustomers/customerProfileStyle";

import AddImage from "assets/img/add.png";

class CustomerProfile extends React.Component {

    constructor() {
        super();
        this.state = {
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
                                    <Button color="info" className={classes.firstButton}>
                                        Profile
                                    </Button>
                                    <Button color="default" className={classes.lastButton}>
                                        Purchases
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </CardHeader>
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
