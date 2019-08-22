/**
 * Descirption: Confirm Modal
 * Date: 4/25/2019
 */

import React from "react";
import PropTypes from "prop-types";

import moment from 'moment';
import Datetime from "react-datetime";

import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import * as Utils from 'utils/api';
import * as Validator from "utils/validator";
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class DirectBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step        : 1,
            service     : "",
            hairdresser : "",
            date        : "",
            time        : "",
            consumerName        : "",
            consumerNameState   : "",
            consumerEmail       : "",
            consumerEmailState  : "",
            consumerMobile      : "",
            consumerMobileState : "",
            comment             : "",
            commentState        : ""
        }
    }

    changeForm(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "service":
            case "hairdresser":
            case "time":
                this.setState({
                    [stateName]: event.target.value
                });
                break;
            case "date":
                if(!moment(event._d).isSame(moment())) {
                    this.setState({ date: moment(event._d)});
                } else {
                    this.setState({ date: ""});
                }  
                let service = this.props.services.find(s => s.id === this.state.service)
                this.props.getBookingTimeslots({
                    salonId: this.props.salonId,
                    hairdresserId: this.state.hairdresser,
                    durationInMinutes: service.durationInMinutes,
                    date: moment(event._d, "YYYY MM DD").format("YYYY-MM-DD")
                })
                break;
            case "consumerName":
            case "consumerMobile":
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
            case "consumerEmail":
                this.setState({
                    consumerEmail: event.target.value
                })
                if (Validator.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    canNext() {
        if (this.state.step === 1) {
            if (this.state.service) {
                return true
            } else {
                return false
            }
        } else if(this.state.step === 2) {
            if (this.state.hairdresser) {
                return true
            } else {
                return false
            }
        } else if(this.state.step === 3) {
            if (this.state.date && this.state.time) {
                return true
            } else {
                return false
            }
        } else {
            if (this.state.consumerNameState === "success" && this.state.consumerEmailState === "success" && this.state.consumerMobileState === "success" && this.state.commentState === "success") {
                return true
            } else {
                return false
            }
        }
    }
    nextStep() {
        if (this.state.step === 1) {
            this.props.getBookingEmployees({
                serviceId: this.state.service
            })
            this.setState({step: 2});
        } else if(this.state.step === 2) {
            this.props.getBookingDaysOff({
                salonId: this.props.salonId,
                hairdresserId: this.state.hairdresser,
                year: moment().format('YYYY'),
                month: moment().format('MM')
            })
            setTimeout(() => {
                this.setState({step: 3});                
            }, 1500);
        } else if(this.state.step === 3) {
            this.setState({step: 4});
        } else if(this.state.step == 4) {
            this.book()
        }
    }

    prevStep() {
        if (this.state.step > 1) {
            this.setState(prev => ({step: prev.step - 1}))
        }
    }

    initState() {
        this.setState({
            step        : 1,
            service     : "",
            hairdresser : "",
            date        : "",
            time        : "",
            consumerName        : "",
            consumerNameState   : "",
            consumerEmail       : "",
            consumerEmailState  : "",
            consumerMobile      : "",
            consumerMobileState : "",
            comment             : "",
            commentState        : ""
        })
    }

    book() {
        let data = {
            salonId: this.props.salonId,
            serviceId: this.state.service,
            hairdresserId: this.state.hairdresser,
            consumerId: null,
            bookingOrigin: "WEB",
            plannedStartTime: moment(this.state.date, "YYYY MM DD").format('YYYY-MM-DD') + " " + this.state.time + ":00",
            consumerName: this.state.consumerName,
            consumerEmail: this.state.consumerEmail,
            consumerMobile: this.state.consumerMobile,
            comment: this.state.comment
        };
        Utils.xapi().post('booking/makeappointment', data)
        this.initState();
        this.props.onClose(true);
    }

    cancel() {
        this.initState();
        this.props.onClose();
    }

    isPastDate = (current) => {
        var yesterday = Datetime.moment().subtract( 1, 'day' );
        return current.isAfter( yesterday );
    }

    isDisabledDay = (current) => {
        let isDisabled = this.props.daysOff.salonClosingDays.find(item => {
            return item.dayId === current.day()
        })

        return !isDisabled;
    }

    isDisabledDate = (current) => {
        let isDisabled = this.props.daysOff.hairdresserOffDays.find(item => {
            return moment(moment(item.plannedStartTime).format('YYYY-MM-DD')).isSame(moment(current).format("YYYY-MM-DD"));
        });

        return isDisabled; 
    }

    goExternalBooking = url => {
        let link = "http://" + url;
        window.location.href = link; 
        return null;
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
                onClose={() => {this.cancel()}}
                aria-labelledby="confirm-modal-title"
                aria-describedby="confirm-modal-description"
            >
                <DialogTitle
                    id="setting-break-time-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>Direct Booking</h3>
                </DialogTitle>
                {
                    !this.props.isDisabled &&
                        <DialogContent
                            id="confirm-modal-description"
                            className={
                            classes.modalBody + " " + classes.modalSmallBody
                            }
                        >
                            {
                                this.state.step >= 1 &&
                                    <FormControl
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="service-select"
                                            className={classes.selectLabel}
                                        >
                                            Select Service *
                                        </InputLabel>
                                        <Select
                                            value={this.state.service}
                                            onChange={(event) => this.changeForm(event, "service", "service")}
                                            MenuProps={{ className: classes.selectMenu }}
                                            classes={{ select: classes.select }}
                                            inputProps={{
                                                name: "service",
                                                id: "service-select"
                                            }}
                                            disabled={this.state.step !== 1}
                                        >
                                            <MenuItem
                                                disabled
                                                classes={{
                                                    root: classes.selectMenuItem
                                                }}
                                            >
                                                Service
                                            </MenuItem>
                                            {
                                                this.props.services.map((service, index) => {
                                                    return (
                                                        <MenuItem
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                            value={service.id}
                                                            key={index}
                                                        >
                                                            {service.name + " / " + service.durationInMinutes + " mins / " + "kr " + service.price}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                            }                                         
                            
                            {
                                this.state.step >= 2 &&
                                    <FormControl
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="hairdresser-select"
                                            className={classes.selectLabel}
                                        >
                                            Select Hairdresser *
                                        </InputLabel>
                                        <Select
                                            value={this.state.hairdresser}
                                            onChange={(event) => this.changeForm(event, "hairdresser", "hairdresser")}
                                            MenuProps={{ className: classes.selectMenu }}
                                            classes={{ select: classes.select }}
                                            inputProps={{
                                                name: "hairdresser",
                                                id: "hairdresser-select"
                                            }}
                                            disabled={this.state.step !== 2}
                                        >
                                            <MenuItem
                                                disabled
                                                classes={{
                                                    root: classes.selectMenuItem
                                                }}
                                            >
                                                Hairdresser
                                            </MenuItem>
                                            {
                                                this.props.employees.map((employee, index) => {
                                                    return (
                                                        <MenuItem
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                            value={employee.id}
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
                            
                            {
                                this.state.step >= 3 &&
                                    <GridContainer>
                                        <GridItem xs={12} md={7}>
                                            <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                                                {
                                                    this.state.date &&
                                                        <InputLabel className={classes.datePickerLabel}>Select Date *</InputLabel>
                                                }
                                                <Datetime
                                                    timeFormat={false}
                                                    dateFormat={"YYYY-MM-DD"}
                                                    inputProps={{ placeholder: "Select Date *", disabled: this.state.step !== 3 }}
                                                    value={this.state.date}
                                                    onChange={event => this.changeForm(event, "date", "date")}
                                                    isValidDate={ this.isPastDate || this.isDisabledDay || this.isDisabledDate }
                                                />
                                            </FormControl>
                                        </GridItem>
                                        <GridItem xs={12} md={5}>
                                            <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}
                                            >
                                                <InputLabel
                                                    htmlFor="time-select"
                                                    className={classes.selectLabel}
                                                >
                                                    Select Time *
                                                </InputLabel>
                                                <Select
                                                    value={this.state.time}
                                                    onChange={(event) => this.changeForm(event, "time", "time")}
                                                    MenuProps={{ className: classes.selectMenu }}
                                                    classes={{ select: classes.select }}
                                                    inputProps={{
                                                        name: "time",
                                                        id: "time-select"
                                                    }}
                                                    disabled={this.state.step !== 3}
                                                >
                                                    <MenuItem
                                                        disabled
                                                        classes={{
                                                            root: classes.selectMenuItem
                                                        }}
                                                    >
                                                        Time
                                                    </MenuItem>
                                                    {
                                                        this.props.timeSlots.map((slot, index) => {
                                                            if (slot.status === 2) {
                                                                return (
                                                                    <MenuItem
                                                                        classes={{
                                                                            root: classes.selectMenuItem,
                                                                            selected: classes.selectMenuItemSelected
                                                                        }}
                                                                        value={slot.time}
                                                                        key={index}
                                                                    >
                                                                        {slot.time}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </GridItem>
                                    </GridContainer>
                            }                   
                            
                            {
                                this.state.step >= 4 &&
                                    <div>
                                        <CustomInput
                                            success={this.state.consumerNameState === "success"}
                                            error={this.state.consumerNameState === "error"}
                                            id="fullname"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                placeholder: "Namn",
                                                onChange: event => this.changeForm(event, "consumerName", "consumerName", 1),
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face classes={{root: classes.iconRoot}} className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            success={this.state.consumerEmailState === "success"}
                                            error={this.state.consumerEmailState === "error"}
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                placeholder: "E-post",
                                                onChange: event => this.changeForm(event, "consumerEmail", "consumerEmail", 1),
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Email classes={{root: classes.iconRoot}} className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            success={this.state.consumerMobileState === "success"}
                                            error={this.state.consumerMobileState === "error"}
                                            id="phone"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                placeholder: "Mobilnummer",
                                                onChange: event => this.changeForm(event, "consumerMobile", "consumerMobile", 1),
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Phone classes={{root: classes.iconRoot}} className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <TextField
                                            id="outlined-bare"
                                            className={classes.textArea}
                                            InputProps={{
                                                classes: {
                                                    multiline: classes.multiline,
                                                    inputMultiline: classes.inputMultiline
                                                },
                                                onChange: event => this.changeForm(event, "comment", "comment", 1),
                                            }}
                                            multiline
                                            rows="4"
                                            fullWidth
                                            placeholder="Kommentar"
                                            margin="none"
                                            variant="outlined"
                                        />
                                    </div>
                            }
                        </DialogContent>
                }
                {
                    this.props.isDisabled &&
                        <DialogContent>
                            <h4 className={classes.center + " " + classes.danger}>Denna salong har valt att inte erbjuda Geselles tidbokning online</h4>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={4} className={classes.key}>
                                    <h4 style={{marginTop: '0'}}><b>Adress: </b></h4>
                                </GridItem>
                                <GridItem xs={12} sm={8} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}>{this.props.disabledSalonInfo? this.props.disabledSalonInfo.address : ""}</h4>
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={4} className={classes.key}>
                                    <h4 style={{marginTop: '0'}}><b>Stad: </b></h4>
                                </GridItem>
                                <GridItem xs={12} sm={8} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}>{this.props.disabledSalonInfo? this.props.disabledSalonInfo.post + " " + this.props.disabledSalonInfo.city : ""}</h4>
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={4} className={classes.key}>
                                    <h4 style={{marginTop: '0'}}><b>Telefon: </b></h4>
                                </GridItem>
                                <GridItem xs={12} sm={8} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}>{this.props.disabledSalonInfo? this.props.disabledSalonInfo.telephone : ""}</h4>
                                </GridItem>
                            </GridContainer>
                            {
                                this.props.disabledSalonInfo && this.props.disabledSalonInfo.externalBookingUrl &&
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={4} className={classes.key}>
                                            <h4 style={{marginTop: '0'}}><b>Bokningssida: </b></h4>
                                        </GridItem>
                                        <GridItem xs={12} sm={8} className={classes.left}>  
                                            <Button simple className={classes.externalSite} onClick={() => this.goExternalBooking(this.props.disabledSalonInfo? this.props.disabledSalonInfo.externalBookingUrl : "")}>
                                                <h4 className={classes.bookingLink}>{this.props.disabledSalonInfo? this.props.disabledSalonInfo.externalBookingUrl : ""}</h4>
                                            </Button>                                                 
                                        </GridItem>
                                    </GridContainer>
                            }
                        </DialogContent>
                }
                {
                    this.props.isDisabled &&
                        <DialogActions
                            className={
                                classes.modalFooter
                            }
                        >
                            <Button
                                onClick={() => this.cancel()}
                                color="info"
                                size="sm"
                            >
                            Ok
                            </Button>
                        </DialogActions>

                }
                {
                    !this.props.isDisabled &&
                        <DialogActions
                            className={
                                classes.modalFooter + " " + classes.between
                            }
                        >
                            <div>
                            {
                                this.state.step > 1 &&
                                    <Button
                                        onClick={() => this.prevStep()}
                                        color="danger"
                                        size="sm"
                                    >
                                    Prev
                                    </Button>
                            }
                            </div>
                            <Button
                                onClick={() => this.nextStep()}
                                color="info"
                                size="sm"
                                disabled={!this.canNext()}
                            >
                            {
                                this.state.step === 4? "FINISH" : "Next"
                            }
                            </Button>
                        </DialogActions>
                }
            </Dialog>
        );
    }
}

DirectBook.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getBookingEmployees : Actions.getBookingEmployees,
        getBookingDaysOff   : Actions.getBookingDaysOff,
        getBookingTimeslots : Actions.getBookingTimeslots
    }, dispatch);
}

function mapStateToProps(state)
{
    return {
        loading     : state.booking.loading,
        services    : state.booking.services,
        employees   : state.booking.employees,
        daysOff     : state.booking.daysOff,
        timeSlots   : state.booking.timeSlots   
    }
}

export default withStyles(modalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(DirectBook)));
