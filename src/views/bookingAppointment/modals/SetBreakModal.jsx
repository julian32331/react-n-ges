/**
 * Description: SetBreak Modal
 * Date: 4/3/2019
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

// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import * as Validator from "./../../../validator";
import checkInModalStyle from "assets/jss/material-dashboard-pro-react/views/checkInOut/checkInModalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class SetBreakModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment     : "",            
            commentState: ""
        }
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
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

    handleClose() {
        this.props.onClose();
        this.setState({
            comment     : "",        
            commentState: ""
        })
    }

    canSubmit = () => {
        if(this.state.commentState === "success")
            return true;
        else
            return false;
    }

    render() {
        const { classes, data } = this.props;
        console.log('data: ', data)

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
                    aria-labelledby="setting-break-time-title"
                    aria-describedby="setting-break-time-description"
                >
                <DialogTitle
                    id="setting-break-time-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>Setting Break Time/Day</h3>
                </DialogTitle>
                <DialogContent
                    id="setting-break-time-description"
                    className={classes.modalBody}
                >
                    <CustomInput
                        labelText="Time"
                        id="time"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            disabled: true,
                            value: data.start + " - " + data.end,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        success={this.state.commentState === "success"}
                        error={this.state.commentState === "error"}
                        labelText="Comment *"
                        id="comment"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            multiline: true,
                            rows: 3,                                
                            onChange: event =>
                                this.change(event, "comment", "comment", 1),
                            value: this.state.comment,
                            type: "text"
                        }}
                    />
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
                        onClick={() => this.handleClose()}
                        color="info"
                        size="sm"
                        disabled={!this.canSubmit()}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
  }
}

SetBreakModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    workingForId: state.user.workingForId,
    employees: state.employees.employees,
    errorMsg    : state.checkInOut.errorMsg
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkIn: Actions.checkIn
  }, dispatch);
}

export default withStyles(checkInModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SetBreakModal)));
