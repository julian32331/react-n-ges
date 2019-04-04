/**
 * Description: Check in modal
 * Date: 24/12/2018
 */

import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import * as Validator from "../../../validator";
import checkInModalStyle from "assets/jss/material-dashboard-pro-react/views/checkInOut/checkInModalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            s_co: "",
            s_coState: "",
            s_address1: "",
            s_address1State: "",
            s_address2: "",
            s_address2State: "",
            s_city: "",
            s_cityState: "",
            s_zip: "",
            s_zipState: "",
            isNewShippingAddress: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.address) {
            this.setState({
                s_co: nextProps.address.co? nextProps.address.co : "",
                s_coState: nextProps.address.co? "success" : "error",
                s_address1: nextProps.address.street1? nextProps.address.street1 : "",
                s_address1State: nextProps.address.street1? "success" : "error",
                s_address2: nextProps.address.street2? nextProps.address.street2 : "",
                s_address2State: nextProps.address.street2? "success" : "error",
                s_city: nextProps.address.city? nextProps.address.city : "",
                s_cityState: nextProps.address.city? "success" : "error",
                s_zip: nextProps.address.postalCode? nextProps.address.postalCode : "",
                s_zipState: nextProps.address.postalCode? "success" : "error"
            })
        }
    }

    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "s_co":
            case "s_address1":
            case "s_address2":
            case "s_zip":
            case "s_city":
                this.setState({
                    [stateName]: event.target.value,                    
                    isNewShippingAddress: true
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
            case "comment":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    canSubmit() {
        if(this.state.s_coState === "success" &&
            this.state.s_address1State === "success" &&
            this.state.s_address2State === "success" &&
            this.state.s_cityState === "success" &&
            this.state.s_zipState === "success") {
            return true;
        } else {
            return false
        }
    }

    cancelOrder = () => {
        this.setState({
            s_co: this.props.address.co? this.props.address.co : "",
            s_address1: this.props.address.street1? this.props.address.street1 : "",
            s_address2: this.props.address.street2? this.props.address.street2 : "",
            s_city: this.props.address.city? this.props.address.city : "",
            s_zip: this.props.address.postalCode? this.props.address.postalCode : "",
            isNewShippingAddress: false
        });
        this.props.onClose(false);
    }

    saveOrder = () => {
        console.log('this.state.comment: ', this.state.comment)
        let data = {
            workingForId: this.props.workingForId,
            shippingAddress: {
                shippingAddressId: this.props.address.shippingAddressId,
                street1: this.state.s_address1,
                street2: this.state.s_address2,
                postalCode: this.state.s_zip,
                city: this.state.s_city,
                co: this.state.s_co
            },
            isNewShippingAddress: this.state.isNewShippingAddress,
            orderNote: this.state.comment,
            cart: this.props.cart
        }
        this.props.makeOrder(data);
        this.props.onClose(true);
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                classes={{
                    root: classes.center + " " + classes.modalRoot,
                    paper: classes.modal
                }}
                open={this.props.onOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.cancelOrder()}
                aria-labelledby="checkin-modal-title"
                aria-describedby="checkin-modal-description"
                >
                <DialogTitle
                    id="checkin-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>Order</h3>
                </DialogTitle>
                <DialogContent
                    id="checkin-modal-description"
                    className={classes.modalBody}
                >
                    <CustomInput
                        success={this.state.s_coState === "success"}
                        error={this.state.s_coState === "error"}
                        labelText="Co *"
                        id="co"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment:
                                this.state.s_coState === "error" ? (
                                <InputAdornment position="end">
                                    <Warning className={classes.danger} />
                                </InputAdornment>
                                ) : (
                                undefined
                            ),
                            onChange: event =>
                                this.change(event, "s_co", "s_co", 0),
                            value: this.state.s_co,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        success={this.state.s_address1State === "success"}
                        error={this.state.s_address1State === "error"}
                        labelText="Adress1 *"
                        id="address"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment:
                                this.state.s_address1State === "error" ? (
                                <InputAdornment position="end">
                                    <Warning className={classes.danger} />
                                </InputAdornment>
                                ) : (
                                undefined
                            ),
                            onChange: event =>
                                this.change(event, "s_address1", "s_address1", 0),
                            value: this.state.s_address1,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        success={this.state.s_address2State === "success"}
                        error={this.state.s_address2State === "error"}
                        labelText="Adress2 *"
                        id="address"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment:
                                this.state.s_address2State === "error" ? (
                                <InputAdornment position="end">
                                    <Warning className={classes.danger} />
                                </InputAdornment>
                                ) : (
                                undefined
                            ),
                            onChange: event =>
                                this.change(event, "s_address2", "s_address2", 0),
                            value: this.state.s_address2,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        success={this.state.s_cityState === "success"}
                        error={this.state.s_cityState === "error"}
                        labelText="Postort *"
                        id="city"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment:
                                this.state.s_cityState === "error" ? (
                                <InputAdornment position="end">
                                    <Warning className={classes.danger} />
                                </InputAdornment>
                                ) : (
                                undefined
                            ),
                            onChange: event =>
                                this.change(event, "s_city", "s_city", 0),
                            value: this.state.s_city,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        success={this.state.s_zipState === "success"}
                        error={this.state.s_zipState === "error"}
                        labelText="Postnummer *"
                        id="zip"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment:
                                this.state.s_zipState === "error" ? (
                                <InputAdornment position="end">
                                    <Warning className={classes.danger} />
                                </InputAdornment>
                                ) : (
                                undefined
                            ),
                            onChange: event =>
                                this.change(event, "s_zip", "s_zip", 0),
                            value: this.state.s_zip,
                            type: "number"
                        }}
                    />
                    <CustomInput
                        labelText="Salongsbeskrivning"
                        id="comment"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            multiline: true,
                            rows: 4,                              
                            onChange: event =>
                                this.change(event, "comment", "comment", 0),
                            value: this.state.description,
                            type: "text"
                        }}
                    />
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button 
                        color="danger"
                        size="sm"
                        onClick={() => this.cancelOrder()}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.saveOrder()}
                        color="info"
                        size="sm"
                        disabled={!this.canSubmit()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
  }
}

ConfirmModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    workingForId: state.user.workingForId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    makeOrder: Actions.makeOrder
  }, dispatch);
}

export default withStyles(checkInModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmModal)));
