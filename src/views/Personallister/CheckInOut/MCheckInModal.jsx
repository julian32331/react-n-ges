/**
 * Description: Manual check in modal
 * Date: 2/2/2019
 */

import React from "react";
import PropTypes from "prop-types";

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
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";

import * as Validator from "./../../../validator";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class MCheckInModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameState: "",
            ssn: "",
            ssnState: "",
        }
        this.save = this.save.bind(this);
    }

    initState() {
        this.setState({
            name: "",
            nameState: "",
            ssn: "",
            ssnState: "",
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
    }

    save() {
        this.props.mCheckIn({
            workingForId: this.props.workingForId,
            manualEntryName: this.state.name,
            manualEntrySSN: this.state.ssn
        });
        this.initState();
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "name":
            case "ssn":
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

    canSave() {
        if(this.state.nameState === "success" && this.state.ssnState === "success") {
            return false;
        } else if(this.props.data) {
            return false;
        } else {
            return true;
        }
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
                onClose={() => this.handleClose()}
                aria-labelledby="manual-check-in-modal-title"
                aria-describedby="manual-check-in-modal-description"
            >
                <DialogTitle
                    id="manual-check-in-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>Manual Check In</h3>
                </DialogTitle>
                <DialogContent
                    id="manual-check-in-modal-description"
                    className={classes.modalBody}
                >
                    <form>
                        <CustomInput
                            success={this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText="Name *"
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                endAdornment:
                                    this.state.nameState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.change(event, "name", "name", 1),
                                type: "text",
                                value: this.state.name
                            }}
                        />
                        <CustomInput
                            success={this.state.ssnState === "success"}
                            error={this.state.ssnState === "error"}
                            labelText="SSN *"
                            id="ssn"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                endAdornment:
                                    this.state.ssnState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.change(event, "ssn", "ssn", 1),
                                type: "number",
                                value: this.state.ssn
                            }}
                        />
                    </form>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button 
                        color="danger"
                        size="sm"
                        onClick={() => this.handleClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.save()}
                        color="info"
                        size="sm"
                        disabled={this.canSave()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

MCheckInModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        mCheckIn: Actions.mCheckIn
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(MCheckInModal)));