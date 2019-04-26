/**
 * Description: SetBreak Modal
 * Date: 4/3/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
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

// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import * as Validator from "utils/validator";
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class SetBreak extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment         : "",            
            commentState    : "", 
            hairdresserId   : ""
        }
    }

    change(event, stateName, type, length) {
        switch (type) {
            case "comment":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, length)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    handleEmployee = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose() {
        this.props.onClose();
        this.setState({
            comment         : "",        
            commentState    : "",
            hairdresserId   : ""
        })
    }

    canSubmit = () => {
        if((this.state.commentState === "success" && this.state.hairdresserId) || (this.state.commentState === "success" && this.props.data.hairdresserId))
            return true;
        else
            return false;
    }

    save = () => {
        const { workingForId, data } = this.props;
        let root = data.hairdresserId? 'time' : 'day';
        this.props.setBreak({
            workingForId    : workingForId,
            hairdresserId   : data.hairdresserId || this.state.hairdresserId,
            breakStartAt    : data.start,
            comment         : this.state.comment
        }, root)
        this.handleClose();
    }

    render() {
        const { classes, data, employees } = this.props;

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
                    <h3 className={classes.modalTitle}>Lägg in rast</h3>
                </DialogTitle>
                <DialogContent
                    id="setting-break-time-description"
                    className={classes.modalBody}
                >
                    <CustomInput
                        labelText="Tid"
                        id="time"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            disabled: true,
                            value: data.end? data.start + " - " + data.end : data.start,
                            type: "text"
                        }}
                    />
                    {
                        !data.hairdresserId &&
                            <FormControl
                                fullWidth
                                className={classes.selectFormControl}
                            >
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    Select Employee *
                                </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select + " " + classes.left
                                    }}
                                    value={this.state.hairdresserId}
                                    onChange={this.handleEmployee}
                                    inputProps={{
                                        name: "hairdresserId",
                                        id: "simple-select"
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
                                    {
                                        employees.map((employee, index) => {
                                            return (
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value={employee.hairdresser_id}
                                                    key={index}
                                                >
                                                    {employee.name}
                                                </MenuItem>
                                            )
                                        })
                                    }   
                                </Select>
                            </FormControl>
                    }                    
                    <CustomInput
                        success={this.state.commentState === "success"}
                        error={this.state.commentState === "error"}
                        labelText="Kommentar *"
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
                        Avbryt
                    </Button>
                    <Button
                        onClick={() => this.save()}
                        color="info"
                        size="sm"
                        disabled={!this.canSubmit()}
                    >
                        Bekräfta
                    </Button>
                </DialogActions>
            </Dialog>
        );
  }
}

SetBreak.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    workingForId: state.auth.workingForId,
    employees   : state.booking_appointment.employees
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setBreak: Actions.setBreak
  }, dispatch);
}

export default withStyles(modalStyle)(connect(mapStateToProps, mapDispatchToProps)(SetBreak));
