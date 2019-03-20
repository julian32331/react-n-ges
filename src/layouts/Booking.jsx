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

// @material-ui/icons
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import Loader from 'react-loader-spinner';

import bookingStyle from "assets/jss/material-dashboard-pro-react/layouts/bookingStyle.jsx";

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            serviceId: null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.getBookingServices({
            salonId: this.props.match.params.salonId
        })
    }
    
    handleChange(event, name) {
        this.setState({ [name]: event.target.value });
    }

    handleNext = () => {
        if(this.state.activeStep === 0 && this.state.serviceId) {
            this.props.getBookingEmployees({
                serviceId: this.state.serviceId
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

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;
        const steps = ['Service', 'Hairdresser', 'Date/Time'];
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
                                        onChange={(event) => this.handleChange(event, 'serviceId')}
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
                    return 'What is an ad group anyways?';
                case 2:                    
                    let today = new Date();
                    let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
                    return (
                        <GridContainer>
                            <GridItem xs={12} sm={6}>
                                <InfiniteCalendar
                                    width='100%'
                                    height={340}
                                    selected={today}
                                    disabledDays={[0]}
                                    minDate={lastWeek}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6}>
                                <h3 className={classes.title}>Please select time</h3>
                                <FormControlLabel
                                    control={
                                    <Radio
                                        checked={this.state.selectedValue === "a"}
                                        onChange={this.handleChange}
                                        value="a"
                                        name="radio button demo"
                                        aria-label="A"
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
                                    label: classes.label
                                    }}
                                    label="08:00"
                                />
                                <FormControlLabel
                                    control={
                                    <Radio
                                        checked={this.state.selectedValue === "b"}
                                        onChange={this.handleChange}
                                        value="b"
                                        name="radio button demo"
                                        aria-label="B"
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
                                    label: classes.label
                                    }}
                                    label="13:30"
                                />
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
        getBookingEmployees : Actions.getBookingEmployees
    }, dispatch);
}

function mapStateToProps(state)
{
    return {
        loading     : state.booking.loading,
        services    : state.booking.services,
        employees   : state.booking.employees
    }
}

export default withStyles(bookingStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Booking)));
