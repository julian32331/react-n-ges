/**
 * Description: Pages style
 * Date: 12/25/2018
 */

import React from "react";
import PropTypes from "prop-types";

import moment from 'moment';

import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Check from "@material-ui/icons/Check";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";
import Stepper from "components/Stepper/Stepper.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";

import 'react-infinite-calendar/styles.css';
import Slider from "react-slick";

import * as Utils from 'utils/api';
import * as Validator from "utils/validator";
import bookingStyle from "assets/jss/material-dashboard-pro-react/layouts/bookingStyle.jsx";
import defaultAvatar from "assets/img/default-avatar.png";

const days = [    
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag"
];

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBookingState   : true,
            disabledSalonInfo   : null,
            bookingWeeks        : 0,
            step                : 1,
            serviceId           : null,
            serviceDuration     : "",            
            hairdresserId       : null,
            booking_date        : "",
            booking_time        : "",
            consumerName        : "",
            consumerNameState   : "",
            consumerEmail       : "",
            consumerEmailState  : "",
            consumerMobile      : "",
            consumerMobileState : "",
            comment             : ""
        }
    }

    componentDidMount() {
        let salonId = this.props.match.params.salonId
        Utils.xapi().post('booking/checksalon', {salonId: salonId}).then(response => {
            this.setState({
                checkBookingState: false,
                bookingWeeks: response.data.bookingWeeks
            })
            if(response.data.bookingEnabled) {
                this.props.getBookingServices({
                    salonId: salonId
                })
            } else {
                this.setState({
                    disabledSalonInfo: {
                        address: response.data.address,
                        bookingEnabled: response.data.bookingEnabled,
                        city: response.data.city,
                        country: response.data.country,
                        email: response.data.email,
                        externalBookingUrl: response.data.externalBookingUrl,
                        post: response.data.post,
                        telephone: response.data.telephone,
                        website: response.data.website
                    }
                })
            }
        })
    }

    makeServices = (services) => {
        let arr = [], temp;
        services.map((service, key) => {
            temp = [];

            temp.push(key + 1);
            temp.push(this.tbl_check(service));
            temp.push(service.name);
            temp.push(service.durationInMinutes + ' mins');
            temp.push('kr ' + service.price);

            arr.push(temp);
        })
        return arr
    }
    tbl_check = (service) => {
        const { classes } = this.props;
        return (
            <Checkbox
                className={classes.positionAbsolute}
                tabIndex={-1}
                onClick={() => this.selectService(service)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                    checked: classes.checked,
                    root: classes.checkRoot
                }}
                checked={this.state.serviceId === service.id}
            />
        )
    }
    selectService = (service) => {
        this.setState({
            serviceId: service.id,
            serviceDuration: service.durationInMinutes
        })
    }

    selectEmployee = (employee) => {
        this.setState({
            hairdresserId   : employee.id,
            hairdresserName : employee.name
        })
    }

    handlerStep = () => {
        if(this.state.step === 1) {
            this.props.getBookingEmployees({
                serviceId: this.state.serviceId
            })
            this.setState(prev=>({step: prev.step + 1}))
        } else if(this.state.step === 2) {
            this.props.getBookingDaysOff({
                salonId: this.props.match.params.salonId,
                hairdresserId: this.state.hairdresserId,
                year: moment().format('YYYY'),
                month: moment().format('MM')
            })
            this.setState(prev=>({step: prev.step + 1}))
        } else if(this.state.step === 3) {
            this.setState(prev=>({step: prev.step + 1}))
        } else if(this.state.step === 4) {
            let data = {
                salonId: this.props.match.params.salonId,
                serviceId: this.state.serviceId,
                hairdresserId: this.state.hairdresserId,
                consumerId: this.props.match.params.consumerId,
                bookingOrigin: "WEB",
                plannedStartTime: moment(this.state.booking_date, "YYYY MM DD").format('YYYY-MM-DD') + " " + this.state.booking_time + ":00",
                consumerName: this.state.consumerName,
                consumerEmail: this.state.consumerEmail,
                consumerMobile: this.state.consumerMobile,
                comment: this.state.comment
            };
            Utils.xapi().post('booking/makeappointment', data)
            this.setState(prev=>({step: prev.step + 1}))
        } else if(this.state.step === 5) {
            this.setState({
                step                : 1,
                serviceId           : null,            
                hairdresserId       : null,
                booking_date        : "",
                booking_time        : "",
                consumerName        : "",
                consumerNameState   : "",
                consumerEmail       : "",
                consumerEmailState  : "",
                consumerMobile      : "",
                consumerMobileState : "",
                comment             : ""
            })
        }
    }

    canNext = () => {
        if(this.state.step === 1) {
            if(this.state.serviceId) return true;
            else return false
        } else if(this.state.step === 2) {
            if(this.state.hairdresserId) return true;
            else return false
        } else if(this.state.step === 3) {
            if(this.state.booking_date && this.state.booking_time) return true;
            else return false
        } else {
            return true;
        }
    }

    generateDates = () => {
        let arr = [];

        if(this.props.daysOff) {
            let start = moment();
            let end = moment().add(this.state.bookingWeeks, 'weeks')
            while(start < end){
                let temp = {};
                temp.date = moment(start).format('YYYY MM DD');
                temp.day = days[moment(start).day()];
                if(moment(start.format('YYYY MM DD')).isSame(this.state.booking_date)) {
                    temp.status = 2; // actived
                } else if(this.isDisabledDay(this.props.daysOff.salonClosingDays, start.day()) || this.isDisabledDate(this.props.daysOff.hairdresserOffDays, start)) {
                    temp.status = 3; // disabled
                } else {
                    temp.status = 0; // enable
                }
                
                arr.push(temp);
                start = moment(start).add(1, 'days')  
            }
        }

        return arr;
    }
    isDisabledDay = (arr, value) => {
        let isDisabled = arr.find(item => {
            return item.dayId === value
        })

        return isDisabled;
    }

    isDisabledDate = (arr, value) => {
        let isDisabled = arr.find(item => {
            return moment(moment(item.plannedStartTime).format('YYYY-MM-DD')).isSame(moment(value).format("YYYY-MM-DD"));
        });

        return isDisabled; 
    }

    selectDate = (data) => {
        if(data.status === 0) {
            this.setState({booking_date: data.date});
            this.props.getBookingTimeslots({
                salonId: this.props.match.params.salonId,
                hairdresserId: this.state.hairdresserId,
                durationInMinutes: this.state.serviceDuration,
                date: moment(data.date, "YYYY MM DD").format("YYYY-MM-DD")
            })
        }
    }

    selectTime = (data) => {
        if(data.status !== 1 && data.status !==3) {
            this.setState({booking_time: data.time});
        }
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
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

    goExternalBooking = url => {
        let link = "http://" + url;
        window.location.href = link; 
        return null;
    }

    render() {
        const { classes, loading, employees, timeSlots } = this.props;
        const { step, booking_date } = this.state;

        let button_name = "Nästa";
        if(step === 4) button_name = "Bekräfta";
        if(step === 5) button_name = "Go Back";

        const services = this.makeServices(this.props.services);

        const settings = {
            arrows: false,
            lazyLoad: true,
            infinite: true,
            slidesToShow: employees.length > 2? 3 : employees.length,
            speed: 500
        };

        const width = employees.length > 2? '100%' : employees.length * 30 + '%';

        const dates = this.generateDates();
        if(dates.length > 0 && booking_date == "") {
            this.selectDate(dates[0])
        }
        const date_settings = {
            arrows: false,
            infinite: false,
            slidesToShow: 7,
            slidesToScroll: 7,
            speed: 500,
            responsive: [
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                  }
                }
            ]
        };

        const time_settings = {
            arrows: false,
            infinite: false,
            slidesToShow: 13,
            slidesToScroll: 13,
            speed: 500,
            responsive: [
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                  }
                }
            ]
        };

        return (
            <div className={classes.container}>
                {
                    this.state.checkBookingState? (
                        <div className={classes.loading_container}>
                            <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                        </div>
                    ) : (
                        <div>
                            {
                                this.state.disabledSalonInfo? (
                                    <div style={{paddingTop: '200px'}}>
                                        <h2 className={classes.salonTitle}>Boknigsinformation</h2>
                                        <h3 className={classes.center}>Denna salong har valt att inte erbjuda Geselles tidbokning online</h3>
                                        <GridContainer justify="center">
                                            <GridItem xs={12} sm={3} className={classes.right}>
                                                <h3 style={{marginTop: '0'}}><b>Adress: </b></h3>
                                            </GridItem>
                                            <GridItem xs={12} sm={5} className={classes.left}>
                                                <h3 style={{marginTop: '0'}}>{this.state.disabledSalonInfo? this.state.disabledSalonInfo.address + " " + this.state.disabledSalonInfo.post : " " + this.state.disabledSalonInfo.city}</h3>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <GridItem xs={12} sm={3} className={classes.right}>
                                                <h3 style={{marginTop: '0'}}><b>Telefon: </b></h3>
                                            </GridItem>
                                            <GridItem xs={12} sm={5} className={classes.left}>
                                                <h3 style={{marginTop: '0'}}>{this.state.disabledSalonInfo? this.state.disabledSalonInfo.telephone : ""}</h3>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <GridItem xs={12} sm={3} className={classes.right}>
                                                <h3 style={{marginTop: '0'}}><b>Bokningssida: </b></h3>
                                            </GridItem>
                                            <GridItem xs={12} sm={5} className={classes.left}>                                                                                                    
                                                <Button simple className={classes.externalSite} onClick={() => this.goExternalBooking(this.state.disabledSalonInfo? this.state.disabledSalonInfo.externalBookingUrl : "")}>
                                                    <h3 className={classes.bookingLink}>{this.state.disabledSalonInfo? this.state.disabledSalonInfo.externalBookingUrl : ""}</h3>  
                                                </Button>                                                 
                                            </GridItem>
                                        </GridContainer>
                                    </div>
                                ) : (
                                    <div>
                                        <GridContainer>
                                            <GridItem xs={12} >
                                                <h1 className={classes.title}>Boka tid</h1>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={3}>
                                                <Stepper active={this.state.step === 1} number={1} title="Tjänster" sub="Välj önskad tjänst" />
                                            </GridItem>
                                            <GridItem xs={12} sm={3}>
                                                <Stepper active={this.state.step === 2} number={2} title="Välj Frisör" sub="Välj önskad frisör" />
                                            </GridItem>
                                            <GridItem xs={12} sm={3}>
                                                <Stepper active={this.state.step === 3} number={3} title="Datum och tid" sub="När vill du boka tid?" />
                                            </GridItem>
                                            <GridItem xs={12} sm={3}>
                                                <Stepper active={this.state.step === 4} number={4} title="Kontaktinfo" sub="Lägg in kontaktinformation" />
                                            </GridItem>
                                        </GridContainer>
                                        <div className={classes.content}>
                                        {
                                            step === 1 &&
                                                <div>
                                                {
                                                    loading? (
                                                        <div className={classes.loading_container}>
                                                            <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                                                        </div>
                                                    ) : 
                                                    <Card>
                                                        <CardBody>
                                                            <Table
                                                                striped
                                                                tableHead={[
                                                                    "#",
                                                                    "",
                                                                    "Namn på tjänsten",
                                                                    "Varaktighet",
                                                                    "Pris"
                                                                ]}
                                                                tableData={services}
                                                                customCellClasses={[
                                                                    classes.center,
                                                                    classes.nowrap,
                                                                    classes.right + " " + classes.nowrap
                                                                ]}
                                                                customClassesForCells={[0, 1, 4]}
                                                                customHeadCellClasses={[
                                                                    classes.center,
                                                                    classes.nowrap,
                                                                    classes.right + " " + classes.nowrap
                                                                ]}
                                                                customHeadClassesForCells={[0, 1, 4]}
                                                            />
                                                        </CardBody>
                                                    </Card>
                                                }
                                                </div>
                                        }    
                                        {                    
                                            step === 2 &&
                                                <div>
                                                    {
                                                        loading? (
                                                            <div className={classes.loading_container}>
                                                                <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                                                            </div>
                                                        ) : (
                                                            employees.length > 0 && 
                                                                <div className={classes.employee}>
                                                                    <div style={{width: width, margin: 'auto'}}>
                                                                        <Slider {...settings} ref="employee_slider">
                                                                            {
                                                                                employees.map((employee, key) => {
                                                                                    return (
                                                                                        <div className={classes.slide_container} key={key} onClick={() => this.selectEmployee(employee)}>
                                                                                            <img src={employee.EmployeeInformation.picturePath? Utils.root + employee.EmployeeInformation.picturePath : defaultAvatar} className={classes.slide_img} alt="..." />
                                                                                            <div className={classes.slide_name}>{ employee.name }</div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Slider>
                                                                    </div>                                   
                                                                    <GridContainer alignItems="center">
                                                                        <GridItem xs={3}>
                                                                            <Button
                                                                                justIcon
                                                                                simple
                                                                                size="lg"
                                                                                color="info"
                                                                                onClick={()=>this.refs.employee_slider.slickPrev()}
                                                                                >
                                                                                <ArrowBackIos className={classes.icons} />
                                                                            </Button>
                                                                        </GridItem>
                                                                        <GridItem xs={6}>
                                                                            <div className={classes.employeeName}>{this.state.hairdresserName}</div>
                                                                            {/* <div className={classes.employeeExpert}>BEAUTY THERAPIST</div> */}
                                                                        </GridItem>
                                                                        <GridItem xs={3} className={classes.right}>
                                                                            <Button
                                                                                justIcon
                                                                                simple
                                                                                size="lg"
                                                                                color="info"
                                                                                onClick={()=>this.refs.employee_slider.slickNext()}
                                                                                >
                                                                                <ArrowForwardIos className={classes.icons} />
                                                                            </Button>
                                                                        </GridItem>
                                                                    </GridContainer>
                                                                </div>
                                                        )                                
                                                    }
                                                </div>
                                                
                                        }                
                                        {
                                            step === 3 &&
                                                <div>
                                                    {
                                                        loading? (
                                                            <div className={classes.loading_container}>
                                                                <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                                                            </div>
                                                        ) : (
                                                            <div className={classes.date_time}>
                                                                <div className={classes.month_container}>{booking_date? moment(booking_date, "YYYY MM DD").format('MMMM') : moment().format('MMMM')}</div>
                                                                <Slider {...date_settings} ref="date_slider">
                                                                    {
                                                                        dates.map((item, key) => {
                                                                            let date, day;
                                                                            if(item.status == 1) {
                                                                                date = classes.date + " " + classes.date_dayPassed;
                                                                                day = classes.day + " " + classes.date_dayPassed;
                                                                            } else if(item.status == 2) {
                                                                                date = classes.date + " " + classes.dateActived;
                                                                                day = classes.day + " " + classes.dayActived;
                                                                            } else if(item.status == 3) {
                                                                                date = classes.date + " " + classes.date_dayDisabled;
                                                                                day = classes.day + " " + classes.date_dayDisabled;
                                                                            } else {
                                                                                date = classes.date;
                                                                                day = classes.day;
                                                                            }
                                                                            return (
                                                                                <div key={key} className={classes.date_container} onClick={() => this.selectDate(item, dates.length)}>
                                                                                    <div className={date}>{moment(item.date, "YYYY MM DD").format('D')}</div>
                                                                                    <div className={day}>{item.day}</div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </Slider>

                                                                {
                                                                    this.props.timeSlots.length == 0? (
                                                                        <h4 className={classes.center}>No availible booking</h4>
                                                                    ) : (
                                                                        <Slider {...time_settings} ref="time_slider">
                                                                            {
                                                                                timeSlots.map((item, key) => {
                                                                                    let time;
                                                                                    if(item.status == 1) {
                                                                                        time = classes.time + " " + classes.timePassed;
                                                                                    } else if(item.status == 2) {
                                                                                        time = classes.time
                                                                                    } else if(item.status == 3) {
                                                                                        time = classes.time + " " + classes.timeDisabled;
                                                                                    } 
                                                                                    if(item.time === this.state.booking_time) {
                                                                                        time = classes.time + " " + classes.timeActived;
                                                                                    }
                                                                                    return (
                                                                                        <div key={key} className={classes.time_container}>
                                                                                            <div className={time} onClick={() => this.selectTime(item)}>{item.time}</div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Slider>
                                                                    )
                                                                }  
            
                                                                <GridContainer alignItems="center">
                                                                    <GridItem xs={3}>
                                                                        <Button
                                                                            justIcon
                                                                            simple
                                                                            size="lg"
                                                                            color="info"
                                                                            onClick={()=>this.refs.date_slider.slickPrev()}
                                                                            >
                                                                            <ArrowBackIos className={classes.icons} />
                                                                        </Button>
                                                                    </GridItem>
                                                                    <GridItem xs={6}>
                                                                        <div className={classes.employeeName}>{this.state.booking_date !=="" && moment(this.state.booking_date, "YYYY MM DD").format('DD MMMM YYYY')} {this.state.booking_time} </div>
                                                                    </GridItem>
                                                                    <GridItem xs={3} className={classes.right}>
                                                                        <Button
                                                                            justIcon
                                                                            simple
                                                                            size="lg"
                                                                            color="info"
                                                                            onClick={()=>this.refs.date_slider.slickNext()}
                                                                            >
                                                                            <ArrowForwardIos className={classes.icons} />
                                                                        </Button>
                                                                    </GridItem>
                                                                </GridContainer>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                        }
                                        {
                                            step === 4 &&
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={4}>
                                                    {
                                                        !this.props.match.params.consumerId &&
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
                                                                        onChange: event => this.change(event, "consumerName", "consumerName", 1),
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
                                                                        onChange: event => this.change(event, "consumerEmail", "consumerEmail", 1),
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
                                                                        onChange: event => this.change(event, "consumerMobile", "consumerMobile", 1),
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
                                                            </div>
                                                    }
                                                        
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
                                                
                                        }
                                        {
                                            step === 5 &&
                                                <Card>
                                                    <CardBody>
                                                        <div>Bokningen är klar!</div>                                
                                                    </CardBody>
                                                </Card>
                                        }
                                        </div>
                                        <GridContainer justify="space-between" alignItems="center">
                                            <GridItem>
                                            </GridItem>
                                            <GridItem>
                                                <Button color="info" disabled={!this.canNext()} onClick={() => this.handlerStep()}>{button_name}</Button>
                                            </GridItem>
                                        </GridContainer>
                                        <div className={classes.divider}></div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }                
            </div>
        );
    }
}

Booking.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getBookingServices  : Actions.getBookingServices,
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

export default withStyles(bookingStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Booking)));
