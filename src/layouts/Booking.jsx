/**
 * Description: Pages style
 * Date: 12/25/2018
 */

import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import StepConnector from '@material-ui/core/StepConnector';
// import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { StepIcon } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';

// @material-ui/icons
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Check from "@material-ui/icons/Check";
import Assignment from "@material-ui/icons/Assignment";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";
import Stepper from "components/Stepper/Stepper.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import Slider from "react-slick";
import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";

import moment from 'moment';
import Loader from 'react-loader-spinner';

import bookingStyle from "assets/jss/material-dashboard-pro-react/layouts/bookingStyle.jsx";
import { arch } from "os";

const days = [    
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,            
            booking_date: moment().format('YYYY MM DD'),
            booking_time: "",
            // slideIndex: 0,
            // calendar: []
        }
    }

    generateDates = () => {
        let arr = [];

        let today = moment();
        let start = moment().subtract(3, 'days');
        let end = moment().endOf('month').add(3, 'days');
        while(start < end){
            let temp = {};
            temp.date = moment(start).format('YYYY MM DD');
            temp.day = days[moment(start).day()];
            if(moment(start).isBefore(today) || moment(start).month() > today.month()) {
                temp.status = 1; // passed and next month
            } else if(moment(start.format('YYYY MM DD')).isSame(this.state.booking_date)) {
                temp.status = 2; // actived
            } else if(start.day() === 0) {
                temp.status = 3; // disabled
            } else {
                temp.status = 0; // enable
            }
            
            arr.push(temp);
            start = moment(start).add(1, 'days')  
        }

        return arr;
    }

    generateTimes = () => {
        let arr = [
            {
                time: "08:00",
                status: 1,
            },
            {
                time: "08:30",
                status: 1,
            },
            {
                time: "09:00",
                status: 1,
            },
            {
                time: "09:30",
                status: 1,
            },
            {
                time: "10:00",
                status: 1,
            },
            {
                time: "10:30",
                status: 1,
            },
            {
                time: "11:00",
                status: 1,
            },
            {
                time: "11:30",
                status: 1,
            },
            {
                time: "12:00",
                status: 1,
            },
            {
                time: "12:30",
                status: 1,
            },
            {
                time: "13:00",
                status: 1,
            },
            {
                time: "13:30",
                status: 1,
            },
            {
                time: "14:00",
                status: 1,
            },
            {
                time: "14:30",
                status: 1,
            },
            {
                time: "15:00",
                status: 1,
            },
            {
                time: "15:30",
                status: 1,
            },
            {
                time: "16:00",
                status: 1,
            },
            {
                time: "16:30",
                status: 3,
            },
            {
                time: "17:00",
                status: 1,
            },
            {
                time: "17:30",
                status: 0,
            },
            {
                time: "18:00",
                status: 3,
            },
            {
                time: "18:30",
                status: 2,
            },
            {
                time: "19:00",
                status: 0,
            },
            {
                time: "19:30",
                status: 0,
            },
            {
                time: "20:00",
                status: 0,
            }
        ];        

        return arr;
    }

    selectDate = (data, length) => {
        if(data.status === 0) { // check is enable
            // let duration = moment.duration(moment(data.date).diff(moment(this.state.booking_date)));
            // let days = duration.asDays();
            // let nextIndex = this.state.slideIndex + days;
            // console.log('this.state.slideIndex: ', this.state.slideIndex)
            // console.log('nextIndex: ', nextIndex)
            // if(this.state.slideIndex < nextIndex && this.state.slideIndex < length - 3)
            //     this.refs.date_slider.slickGoTo(this.state.slideIndex + days);
            // else if(this.state.slideIndex > nextIndex && this.state.slideIndex > 3) 
            //     this.refs.date_slider.slickGoTo(this.state.slideIndex + days);
            this.setState({booking_date: data.date});
        }
    }

    selectTime = (data) => {
        if(data.status === 0) {
            this.setState({booking_time: data.time});
        }
    }

    render() {
        const { classes } = this.props;
        const { step, booking_date } = this.state;

        const tbl_check = (id) => {
            return (
                <Checkbox
                    className={classes.positionAbsolute}
                    tabIndex={-1}
                    // onClick={() => this.selectService(id)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                    }}
                />
            )
        }

        const dates = this.generateDates();
        const times = this.generateTimes();

        const settings = {
            arrows: false,
            infinite: true,
            slidesToShow: 3,
            speed: 500
        };
        const date_settings = {
            arrows: false,
            infinite: false,
            slidesToShow: 7,
            slidesToScroll: 7,
            speed: 500,
            // beforeChange: (current, next) => this.setState({ slideIndex: next }),
            // afterChange: (index) => {
            //     console.log(
            //       `Slider Changed to: ${index + 1}`
            //     );
            // }
        };

        const time_settings = {
            arrows: false,
            infinite: false,
            slidesToShow: 13,
            slidesToScroll: 13,
            speed: 500,
        };

        return (
            <div className={classes.container}>
                <GridContainer>
                    <GridItem xs={12} >
                        <h1 className={classes.title}>Bokavtale</h1>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <Stepper active={this.state.step === 1} number={1} title="Tjänster" sub="Välj önskad tjänst" />
                    </GridItem>
                    <GridItem xs={12} sm={3}>
                        <Stepper active={this.state.step === 2} number={2} title="Velg ansatt" sub="Velg ønsket ansatt" />
                    </GridItem>
                    <GridItem xs={12} sm={3}>
                        <Stepper active={this.state.step === 3} number={3} title="Dato og tidspunkt" sub="Når vil du booke en time?" />
                    </GridItem>
                    <GridItem xs={12} sm={3}>
                        <Stepper active={this.state.step === 4} number={4} title="Kontaktinfo" sub="Legg inn kontaktinformasjon" />
                    </GridItem>
                </GridContainer>
                <div className={classes.content}>
                {
                    step === 1 &&
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
                                    tableData={[
                                        [
                                            "1",
                                            tbl_check(1),
                                            "Moleskine Agenda",
                                            "25",
                                            "kr 1,225"
                                        ],
                                        [
                                            "2",
                                            tbl_check(2),
                                            "Stabilo Pen",
                                            "30",
                                            "kr 300"
                                        ],
                                        [
                                            "3",
                                            tbl_check(1),
                                            "Moleskine Agenda",
                                            "25",
                                            "kr 1,225"
                                        ],
                                        [
                                            "4",
                                            tbl_check(2),
                                            "Stabilo Pen",
                                            "30",
                                            "kr 300"
                                        ],
                                        [
                                            "5",
                                            tbl_check(1),
                                            "Moleskine Agenda",
                                            "25",
                                            "kr 1,225"
                                        ],
                                        [
                                            "6",
                                            tbl_check(2),
                                            "Stabilo Pen",
                                            "30",
                                            "kr 300"
                                        ],
                                    ]}
                                    customCellClasses={[
                                        classes.center,
                                        classes.right
                                    ]}
                                    customClassesForCells={[0, 4]}
                                    customHeadCellClasses={[
                                        classes.center,
                                        classes.right
                                    ]}
                                    customHeadClassesForCells={[0, 4]}
                                />
                            </CardBody>
                        </Card>
                }    
                {                    
                    step === 2 &&
                        <div className={classes.employee}>
                            <Slider {...settings} ref="employee_slider">
                                <div className={classes.slide_container}>
                                    <img src={priceImage1} className={classes.slide_img} alt="..." />
                                </div>
                                <div className={classes.slide_container}>
                                    <img src={priceImage2} className={classes.slide_img} alt="..." />
                                </div>
                                <div className={classes.slide_container}>
                                    <img src={priceImage3} className={classes.slide_img} alt="..." />
                                </div>
                                <div className={classes.slide_container}>
                                    <img src={priceImage1} className={classes.slide_img} alt="..." />
                                </div>
                            </Slider>
                            <GridContainer alignItems="center">
                                <GridItem xs={1}>
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
                                <GridItem xs={10}>
                                    <div className={classes.employeeName}>Anna</div>
                                    <div className={classes.employeeExpert}>BEAUTY THERAPIST</div>
                                </GridItem>
                                <GridItem xs={1} className={classes.right}>
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
                }                
                {
                    step === 3 &&
                        <div className={classes.date_time}>
                            <div className={classes.month_container}>{moment(booking_date).format('MMMM')}</div>
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
                                                <div className={date}>{moment(item.date).format('D')}</div>
                                                <div className={day}>{item.day}</div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>

                            <Slider {...time_settings} ref="time_slider">
                                {
                                    times.map((item, key) => {
                                        let time;
                                        if(item.status == 1) {
                                            time = classes.time + " " + classes.timePassed;
                                        } else if(item.status == 2) {
                                            time = classes.time + " " + classes.timeActived;
                                        } else if(item.status == 3) {
                                            time = classes.time + " " + classes.timeDisabled;
                                        } else {
                                            time = classes.time;
                                        }
                                        return (
                                            <div key={key} className={classes.time_container}>
                                                <div className={time} onClick={() => this.selectTime(item)}>{item.time}</div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>

                            <GridContainer alignItems="center">
                                <GridItem xs={1}>
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
                                <GridItem xs={10}>
                                    <div className={classes.employeeName}>{moment(this.state.booking_date).format('DD MMMM YYYY')} {this.state.booking_time} </div>
                                </GridItem>
                                <GridItem xs={1} className={classes.right}>
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
                }
                {
                    step === 4 &&
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    // success={this.state.firstnameState === "success"}
                                    // error={this.state.firstnameState === "error"}
                                    id="fullname"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        placeholder: "Full Name",
                                        // onChange: event => this.change(event, "firstname", "length", 3),
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
                                    id="email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        placeholder: "Email",
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
                                    id="phone"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        placeholder: "Phone",
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
                                        }
                                    }}
                                    multiline
                                    rows="4"
                                    fullWidth
                                    placeholder="Comment"
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        tabIndex={-1}
                                        // onClick={() => this.handleToggle(2)}
                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                            checked: classes.checked,
                                            root: classes.checkRoot
                                        }}
                                    />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="I ACCEPT PRIVACY AND TERMS OF USE"
                                />
                            </GridItem>
                        </GridContainer>
                        
                }
                </div>
                <GridContainer justify="space-between" alignItems="center">
                    <GridItem>
                    </GridItem>
                    <GridItem>
                        <Button color="info" onClick={() => this.setState(prev=>({step: prev.step + 1}))}>Next</Button>
                    </GridItem>
                </GridContainer>
                <div className={classes.divider}></div>
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
