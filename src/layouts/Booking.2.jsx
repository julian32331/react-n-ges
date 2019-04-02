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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { StepIcon } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import moment from 'moment';
import Loader from 'react-loader-spinner';

import bookingStyle from "assets/jss/material-dashboard-pro-react/layouts/bookingStyle.jsx";

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            serviceId: null,
            hairdresserId: null,

        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.getBookingServices({
            salonId: this.props.match.params.salonId
        })
    }
    
    handleChange(value, name) {
        this.setState({ [name]: value });
    }

    handleNext = () => {
        if(this.state.activeStep === 0 && this.state.serviceId) {
            this.props.getBookingEmployees({
                serviceId: this.state.serviceId
            })
        } else if(this.state.activeStep === 1 && this.state.hairdresserId) {
            this.props.getBookingDaysOff({
                salonId: this.props.match.params.salonId,
                hairdresserId: this.state.hairdresserId,
                year: moment().format('YYYY'),
                month: moment().format('MM')
            })
        } else {
            return;
        }
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    getBookingTimeslots(date) {
        this.props.getBookingTimeslots({
            salonId: this.props.match.params.salonId,
            hairdresserId: this.state.hairdresserId,
            date: moment(date).format("YYYY-MM-DD")
        })
    }

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;
        const consumerId = this.props.match.params.consumerId;
        const steps = consumerId? ['Service', 'Hairdresser', 'Date/Time'] : ['Service', 'Hairdresser', 'Date/Time', 'My Information'];
        const connector = (
            <StepConnector classes={{
                root: classes.connectorRoot,
                lineHorizontal: classes.lineHorizontal,
            }} />
        )
        
        const step1 = [];
        this.props.services.map((service, key) => {
            let temp = {
                    title: (
                        <div>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={this.state.serviceId === String(service.id)}
                                        onChange={() => this.handleChange(String(service.id), 'serviceId')}
                                        value={String(service.id)}
                                        icon={
                                            <FiberManualRecord
                                                className={classes.radioUnchecked}
                                            />
                                        }
                                        checkedIcon={
                                            <FiberManualRecord
                                                className={classes.radioChecked}
                                            />
                                        }
                                        classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                        }}
                                    />
                                }
                                classes={{
                                    root: classes.mr_0,
                                    label: classes.label
                                }}
                            />
                            {service.name}
                        </div>
                    ),
                    content: (
                        <GridContainer className={classes.pl_30}>
                            <GridItem xs><span className={classes.contentKey}>Price: </span> kr {service.price}</GridItem>
                            <GridItem xs><span className={classes.contentKey}>Duration: </span> {service.durationInMinutes} (mins)</GridItem>
                            <GridItem xs={12}><span className={classes.contentKey}>Description: </span> {service.description} </GridItem>
                        </GridContainer>
                    )
                }
            step1.push(temp)
        })

        const step2 = [];
        this.props.employees.map((employee, key) => {
            let temp = [
                <Checkbox
                    className={classes.positionAbsolute}
                    tabIndex={-1}
                    onClick={() => this.handleChange(employee.id, 'hairdresserId')}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                    }}
                    checked={this.state.hairdresserId === employee.id}
                />,
                employee.name
            ];
            step2.push(temp);
        })

        let closingDays = [];
        if(this.props.daysOff) 
            this.props.daysOff.salonClosingDays.map((day, key) => {
                closingDays.push(day.dayId)
            })
        closingDays = [...new Set(closingDays)]

        const getStepContent = (step) => {
            switch (step) {
                case 0:
                    return (
                        <Accordion
                            active={0}
                            collapses={step1}
                        />
                    )
                case 1:
                    return (
                        <Table
                            striped
                            tableData={step2}
                            customCellClasses={[
                                classes.right
                            ]}
                            customClassesForCells={[1]}
                            customHeadCellClasses={[
                                classes.right
                            ]}
                            customHeadClassesForCells={[1]}
                        />
                    )
                case 2:
                    return (
                        <GridContainer>
                            <GridItem xs={12} sm={6}>
                                <InfiniteCalendar
                                    width='100%'
                                    height={340}
                                    disabledDays={closingDays}
                                    minDate={moment().toDate()}
                                    onSelect={(date)=>this.getBookingTimeslots(date)}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6}>
                                <h3 className={classes.title}>Please select time</h3>
                                {
                                    this.props.timeSlots.length > 0? (
                                        this.props.timeSlots.map((slot, key) => {
                                            return (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            tabIndex={-1}
                                                            onClick={() => this.handleChange(slot, 'test')}
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
                                                    label={slot}
                                                />
                                            )
                                        })                                        
                                    ) : null
                                }
                                
                            </GridItem>
                        </GridContainer>
                    )
                default:
                    return 'Unknown step';
            }
        }

        return (
        <div>
            <div className={classes.wrapper} ref="wrapper">
                <div className={classes.banner}></div>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={8}>
                            <Card>
                                <CardHeader>
                                    <Stepper alternativeLabel activeStep={activeStep} connector={connector} classes={{
                                        root: classes.stepperRoot
                                    }}>
                                        {steps.map(label => (
                                            <Step key={label}>
                                                <StepLabel StepIconProps={{classes: {root: classes.stepIcon}}} label={{classes: classes.stepLabel}}>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    <div>
                                        {/* {activeStep === steps.length ? (
                                            <div>
                                            <Typography className={classes.instructions}>
                                                All steps completed - you&apos;re finished
                                            </Typography>
                                            <Button onClick={this.handleReset} className={classes.button}>
                                                Reset
                                            </Button>
                                            </div>
                                        ) : ( */}
                                            <GridContainer justify="space-between">
                                                <GridItem xs={6}>
                                                    {
                                                        activeStep !== 0 ? (
                                                            <Button 
                                                                round
                                                                color="danger"
                                                                onClick={this.handleBack}
                                                                className={classes.leftButton}
                                                            >
                                                                <KeyboardArrowLeft /> Back
                                                            </Button>

                                                        ) : undefined
                                                    }
                                                </GridItem>
                                                <GridItem xs={6} className={classes.textRight}>
                                                    {
                                                        activeStep === steps.length - 1 ? (
                                                            <Button
                                                                round
                                                                color="info"
                                                                onClick={this.handleNext}
                                                            >
                                                                Finish 
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                round
                                                                color="info"
                                                                onClick={this.handleNext}
                                                                className={classes.rightButton}
                                                            >
                                                                Next <KeyboardArrowRight /> 
                                                            </Button>
                                                        )
                                                    }
                                                    
                                                </GridItem>
                                            </GridContainer>
                                        {/* )} */}
                                    </div>
                                </CardHeader>
                                <CardBody className={classes.pt_0}>
                                    {
                                        this.props.loading? (
                                            <div className={classes.loading_container}>
                                                <Loader 
                                                    type="Oval"
                                                    color="#7da8ae"
                                                    height="40"	
                                                    width="40"
                                                />
                                            </div>
                                        ) : getStepContent(activeStep)
                                    }
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
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
