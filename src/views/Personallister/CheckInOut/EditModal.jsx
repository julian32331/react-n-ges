/**
 * Descirption: NewOrUpdate modal for saloon service
 * Date: 12/23/2018
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
import moment from 'moment';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkInEditable: "",
            checkInEditableState: "",
            checkOutEditable: "",
            editComment: "",
            editCommentState: ""
        }
        this.save = this.save.bind(this);
    }

    initState() {
        this.setState({
            checkInEditable: "",
            checkInEditableState: "",
            checkOutEditable: "",
            editComment: "",
            editCommentState: ""
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
    }

    save() { 
        this.props.editCheckInOut({
            workingForId: this.props.workingForId,
            personnelListId: this.props.data,
            checkInEditable: this.state.checkInEditable,
            checkOutEditable: this.state.checkOutEditable,
            editComment: this.state.editComment                    
        })
        this.initState();
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "checkInEditable":
            case "checkOutEditable":
                if(!moment(event._d).isSame(moment())) {
                    this.setState({ [stateName]: moment(event._d), [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName]: "", [stateName + "State"]: "error" });
                }
                break;
            case "editComment":
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
        // if(this.state.checkInEditableState === "success" && this.state.editCommentState === "success") {
            return false;
        // } else {
        //     return true;
        // }
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
                aria-labelledby="check-in-out-edit-modal-title"
                aria-describedby="check-in-out-edit-modal-description"
                >
                <DialogTitle
                    id="check-in-out-edit-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>CheckIn/Out Edit</h3>
                </DialogTitle>
                <DialogContent
                    id="check-in-out-edit-modal-description"
                    className={classes.modalBody}
                >
                    <form>             
                        <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                            <Datetime
                                dateFormat={"DD/MM/YYYY"}
                                timeFormat={"HH:mm"}
                                inputProps={{ placeholder: "CheckIn" }}
                                value={this.state.checkInEditable}
                                onChange={event => this.change(event, "checkInEditable", "checkInEditable")}
                            />
                        </FormControl> 
                        <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                            <Datetime
                                dateFormat={"DD/MM/YYYY"}
                                timeFormat={"HH:mm"}
                                inputProps={{ placeholder: "CheckOut" }}
                                value={this.state.checkOutEditable}
                                onChange={event => this.change(event, "checkOutEditable", "checkOutEditable")}
                            />
                        </FormControl> 
                        <CustomInput
                            success={this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText="Comment"
                            id="comment"
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
                                    this.change(event, "editComment", "editComment", 1),
                                type: "text",
                                value: this.state.editComment
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

EditModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editCheckInOut: Actions.editCheckInOut
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(EditModal)));
