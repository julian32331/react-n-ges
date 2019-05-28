/**
 * Description: SetBreak Modal
 * Date: 4/3/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';
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
            date            : "",
            dateState       : "",
            comment         : "",            
            commentState    : "", 
            hairdresserId   : "",
            repeatedDays    : [],
            finalDate       : "",
            finalDateState  : ""
        }
        this.days = [
            "Söndag",
            "Måndag",
            "Tisdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lördag"
        ]
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            this.setState({
                date        : nextProps.data.start,
                dateState   : "success"
            })
        }
    }

    change(event, stateName, type, length) {
        switch (type) {
            case "date":
            case "finalDate":
                if(!moment(event._d).isSame(moment())) {
                    this.setState({ [stateName]: moment(event._d).format("YYYY-MM-DD"), [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName]: "", [stateName + "State"]: "error" });
                }
            break;
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
            date            : "",
            comment         : "",        
            commentState    : "",
            hairdresserId   : ""
        })
    }

    canSubmit = () => {
        if((this.state.commentState === "success" && this.state.hairdresserId && this.state.dateState === "success") || (this.state.commentState === "success" && this.props.data.hairdresserId))
            return true;
        else
            return false;
    }

    save = () => {
        const { workingForId, data } = this.props;
        let root = data.hairdresserId? 'time' : 'day';
        let key = data.hairdresserId? "breakStartAt" : "date";
        let date = data.hairdresserId? data.start : this.state.date;
        this.props.setBreak({
            workingForId    : workingForId,
            hairdresserId   : data.hairdresserId || this.state.hairdresserId,
            [key]           : date,
            breakEndAt      : data.hairdresserId? data.end : null,
            comment         : this.state.comment
        }, root)
        this.handleClose();
    }

    render() {
        const { classes, data, employees } = this.props;
        console.log("data: ", data)

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
                    {
                        data.hairdresserId? (
                            <CustomInput
                                labelText="Tid *"
                                id="time"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    disabled: true,
                                    value: data.end? data.start + " - " + moment(data.end).format("HH:mm") : data.start,
                                    type: "text"
                                }}
                            />
                        ) : (                                    
                            <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                                <Datetime
                                    dateFormat={"YYYY-MM-DD"}
                                    timeFormat={false}
                                    inputProps={{ placeholder: "Tid *" }}
                                    value={this.state.date}
                                    onChange={event => this.change(event, "date", "date")}
                                />
                            </FormControl> 
                        )
                    }
                    
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
                    {/* <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                        >
                        <InputLabel
                            htmlFor="repeated-days"
                            className={classes.selectLabel}
                        >
                            Repeat Days
                        </InputLabel>
                        <Select
                            multiple
                            value={this.state.repeatedDays}
                            onChange={(event) => this.changeForm(event, "repeatedDays", "repeatedDays")}
                            MenuProps={{ className: classes.selectMenu }}
                            classes={{ select: classes.select }}
                            inputProps={{
                                name: "repeatedDays",
                                id: "repeated-days"
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem
                                }}
                            >
                                Repeat Days
                            </MenuItem>
                            {
                                this.days.map((day, key) => {
                                    return (
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelectedMultiple
                                            }}
                                            value={day}
                                            key={key}
                                        >
                                            {day}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>                       
                    <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                        <Datetime
                            timeFormat={false}
                            dateFormat={"YYYY-MM-DD"}
                            inputProps={{ placeholder: "Final date *" }}
                            value={this.state.finalDate}
                            onChange={event => this.change(event, "finalDate", "finalDate")}
                        />
                    </FormControl> */}
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
