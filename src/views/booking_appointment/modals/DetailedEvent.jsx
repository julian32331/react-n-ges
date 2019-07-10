/**
 * Description: Event detail Modal
 * Date: 4/22/2019
 */

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import Delete from "@material-ui/icons/Delete";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";
import * as Validator from "utils/validator";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class DetailedEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            consumerName: "",
            consumerNameState: "",
            consumerEmail: "",
            consumerEmailState: "",
            consumerMobile: "",
            consumerMobileState: "",
            startTime: "",
            startTimeState: "",
            endTime: "",
            endTimeState: "",
            service: "",
            serviceState: "",
            employee: "",
            employeeState: "",
            comment: "",
            commentState: "",
            isEdit: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            this.setState({
                consumerName: nextProps.data.consumerName,
                consumerNameState: nextProps.data.consumerName? "success" : "",
                consumerEmail: nextProps.data.consumerEmail,
                consumerEmailState: nextProps.data.consumerEmail? "success" : "",
                consumerMobile: nextProps.data.consumerMobile,
                consumerMobileState: nextProps.data.consumerMobile? "success" : "",
                startTime: moment(nextProps.data.plannedStartTime).format("YYYY-MM-DD HH:mm"),
                startTimeState: nextProps.data.plannedStartTime? "success" : "",
                endTime: moment(nextProps.data.plannedEndTime).format("YYYY-MM-DD HH:mm"),
                endTimeState: nextProps.data.plannedEndTime? "success" : "",
                service: nextProps.data.service,
                serviceState: nextProps.data.service? "success" : "",
                employee: nextProps.data.resourceId,
                employeeState: nextProps.data.resourceId? "success" : "",
                comment: nextProps.data.comment,
                commentState: nextProps.data.comment? "success" : "",        
            })
        }
    }

    changeForm(event, stateName, type, length) {
        switch (type) {
            case "consumerName":
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
            case "consumerEmail":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "consumerMobile":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyPhone(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "startTime":
            case "endTime":
                if(!moment(event._d).isSame(moment())) {
                    this.setState({ [stateName]: moment(event._d), [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName]: "", [stateName + "State"]: "error" });
                }
                break;
            case "employee":
                this.setState({
                    [stateName]: event.target.value
                })
            default:
                break;
        }
    }

    deleteEvent = () => {
        this.props.onDelete();
        this.props.onClose();
    }

    render() {
        const { classes, data } = this.props;
        
        return (
            <Dialog
                classes={{
                    root: classes.center + " " + classes.modalRoot,
                    paper: classes.modal
                }}
                    open={this.props.onOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.props.onClose()}
                    aria-labelledby="setting-break-time-title"
                    aria-describedby="setting-break-time-description"
                >
                <DialogTitle
                    id="setting-break-time-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <Button
                        justIcon
                        round
                        color="danger"
                        size="sm"
                        className={classes.modalCloseButton}
                        onClick={this.deleteEvent}
                    >
                        <Delete className={classes.modalClose} />
                    </Button>
                    <h3 className={classes.modalTitle}>Bokningsdetaljer</h3>
                </DialogTitle>
                <DialogContent
                    id="setting-break-time-description"
                    className={classes.modalBody}
                >
                    <form>
                        {
                            data && data.bookingType === "SELFBOOKING" &&
                                <div>
                                    <CustomInput
                                        success={this.state.consumerNameState === "success"}
                                        error={this.state.consumerNameState === "error"}
                                        labelText="Kundens namn *"
                                        id="name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            endAdornment:
                                                this.state.consumerNameState === "error" &&
                                                    <InputAdornment position="end">
                                                        <Warning className={classes.danger} />
                                                    </InputAdornment>,
                                            onChange: event =>
                                                this.changeForm(event, "consumerName", "consumerName", 1),
                                            type: "text",
                                            value: this.state.consumerName,
                                            disabled: !this.state.isEdit
                                        }}
                                    />
                                    <CustomInput
                                        success={this.state.consumerEmailState === "success"}
                                        error={this.state.consumerEmailState === "error"}
                                        labelText="E-post *"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            endAdornment:
                                                this.state.consumerEmailState === "error" &&
                                                    <InputAdornment position="end">
                                                        <Warning className={classes.danger} />
                                                    </InputAdornment>,
                                            onChange: event =>
                                                this.changeForm(event, "consumerEmail", "consumerEmail", 1),
                                            type: "text",
                                            value: this.state.consumerEmail,
                                            disabled: !this.state.isEdit
                                        }}
                                    />
                                    <CustomInput
                                        success={this.state.consumerMobileState === "success"}
                                        error={this.state.consumerMobileState === "error"}
                                        labelText="Mobil *"
                                        id="mobile"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            endAdornment:
                                                this.state.consumerMobileState === "error" &&
                                                    <InputAdornment position="end">
                                                        <Warning className={classes.danger} />
                                                    </InputAdornment>,
                                            onChange: event =>
                                                this.changeForm(event, "consumerMobile", "consumerMobile", 1),
                                            type: "text",
                                            value: this.state.consumerMobile,
                                            disabled: !this.state.isEdit
                                        }}
                                    />
                                    <CustomInput
                                        success={this.state.serviceState === "success"}
                                        error={this.state.serviceState === "error"}
                                        labelText="Bokad tjänst *"
                                        id="service"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            endAdornment:
                                                this.state.serviceState === "error" &&
                                                    <InputAdornment position="end">
                                                        <Warning className={classes.danger} />
                                                    </InputAdornment>,
                                            onChange: event =>
                                                this.changeForm(event, "service", "service", 1),
                                            type: "text",
                                            value: this.state.service,
                                            disabled: !this.state.isEdit
                                        }}
                                    />
                                    <CustomInput
                                        success={this.state.serviceState === "success"}
                                        error={this.state.serviceState === "error"}
                                        labelText="Price *"
                                        id="price"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            endAdornment:
                                                this.state.serviceState === "error" &&
                                                    <InputAdornment position="end">
                                                        <Warning className={classes.danger} />
                                                    </InputAdornment>,
                                            onChange: event =>
                                                this.changeForm(event, "service", "service", 1),
                                            type: "text",
                                            // value: this.state.service,
                                            disabled: !this.state.isEdit
                                        }}
                                    />
                                </div>
                        }
                        <GridContainer>
                            <GridItem xs={6}>  
                                {
                                    this.state.startTime != "" &&
                                        <InputLabel className={this.state.startTimeState == "success"? classes.success_datePicker_label : classes.error_datePicker_label}>
                                            Start Time *
                                        </InputLabel>  
                                }                    
                                <FormControl fullWidth className={this.state.startTimeState == "success"? classes.selectedDatePicker : classes.datePicker}>
                                    <Datetime
                                        timeFormat={"HH:mm"}
                                        dateFormat={"YYYY-MM-DD"}
                                        inputProps={{ 
                                            placeholder: this.state.startTimeState == "success"? "" : "Start Time *",
                                            disabled: !this.state.isEdit
                                        }}
                                        value={this.state.startTime}
                                        onChange={event => this.changeForm(event, "startTime", "startTime")}
                                    />
                                </FormControl> 
                            </GridItem>
                            <GridItem xs={6}>  
                                {
                                    this.state.endTimeState == "success" &&
                                    <InputLabel className={classes.success_datePicker_label}>
                                        End Time *
                                    </InputLabel>  
                                }                      
                                <FormControl fullWidth className={this.state.endTimeState == "success"? classes.selectedDatePicker : classes.datePicker}>
                                    <Datetime
                                        timeFormat={"HH:mm"}
                                        dateFormat={"YYYY-MM-DD"}
                                        inputProps={{ 
                                            placeholder: this.state.endTimeState == "success"? "" : "End Time *",
                                            disabled: !this.state.isEdit
                                         }}
                                        value={this.state.endTime}
                                        onChange={event => this.changeForm(event, "endTime", "endTime")}
                                    />
                                </FormControl> 
                            </GridItem>
                        </GridContainer>                                              
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                        >
                            <InputLabel
                                htmlFor="employee-select"
                                className={classes.selectLabel}
                            >
                                Frisör *
                            </InputLabel>
                            <Select
                                value={this.state.employee}
                                onChange={(event) => this.changeForm(event, "employee", "employee")}
                                MenuProps={{ className: classes.selectMenu }}
                                classes={{ select: classes.select }}
                                inputProps={{
                                    name: "employee",
                                    id: "employee-select",
                                    disabled: !this.state.isEdit
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    Frisör
                                </MenuItem>
                                {
                                    this.props.employees.map((employee, key) => {
                                        return (
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                value={employee.hairdresser_id}
                                                key={key}
                                            >
                                                {employee.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <CustomInput
                            success={this.state.commentState === "success"}
                            error={this.state.commentState === "error"}
                            labelText="Kommentar *"
                            id="comment"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                endAdornment:
                                    this.state.commentState === "error" &&
                                        <InputAdornment position="end">
                                            <Warning className={classes.danger} />
                                        </InputAdornment>,
                                onChange: event =>
                                    this.changeForm(event, "comment", "comment", 1),
                                type: "text",
                                value: this.state.comment,
                                multiline: true,
                                rows: 3,
                                disabled: !this.state.isEdit
                            }}
                        />
                    </form>
                </DialogContent>
                {
                    this.state.isEdit? (
                        <DialogActions className={classes.modalFooter}>
                            <Button 
                                color="danger"
                                size="sm"
                                onClick={() => this.setState({isEdit: false})}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => this.save(this.props.data? false : true)}
                                color="info"
                                size="sm"
                                // disabled={!this.canSave()}
                            >
                                Save
                            </Button>
                        </DialogActions>
                    ) : (                        
                        <DialogActions className={classes.modalFooter}>
                            <Button
                                onClick={() => this.setState({isEdit: true})}
                                color="info"
                                size="sm"
                                // disabled={!this.canSave()}
                            >
                                Edit
                            </Button>
                        </DialogActions>
                    )
                }
            </Dialog>
        );
  }
}

DetailedEvent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(commonModalStyle)((DetailedEvent));
