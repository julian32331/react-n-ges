/**
 * Descirption: Delete modal for saloon service
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
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Create from "@material-ui/icons/Create";
import Close from "@material-ui/icons/Close";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";

import openingHoursStyle from "assets/jss/material-dashboard-pro-react/views/openingHours/openingHoursStyle.jsx";

import DeleteModal from "./deleteModal";
import NewOrUpdateModal from "./newOrUpdateModal";

class OpeningHours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModal: false,
            newOrUpdateModal: false,
            btn_name: '',            
            checkedA: true,
        };
        this.getHours = this.getHours.bind(this);
    }

    componentWillMount() {
        this.props.getUserData();
        setTimeout(() => {
            this.getHours();
        }, 100);
    }
    
    getHours() {
        this.props.getHours({
            workingForId: this.props.workingForId
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.openingHours) {
            nextProps.openingHours.map(day => {
                if (day.dayId === 1) {
                    this.setState({
                        Monday_name: day.name,
                        Monday_open: day.open,
                        Monday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                        Monday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                    });
                }
                if (day.dayId === 2) {
                    this.setState({
                        Tuesday_name: day.name,
                        Tuesday_open: day.open,
                        Tuesday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                        Tuesday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                    });
                }
                if (day.dayId === 3) {
                    this.setState({
                        Wednesday_name: day.name,
                        Wednesday_open: day.open,
                        Wednesday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                        Wednesday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                    });
                }
                if (day.dayId === 4) {
                    this.setState({
                        Thursday_name: day.name,
                        Thursday_open: day.open,
                        Thursday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                        Thursday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                    });
                }
                if (day.dayId === 5) {
                    this.setState({
                        Friday_name: day.name,
                        Friday_open: day.open,
                        Friday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                        Friday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                    });
                }
                if (day.dayId === 6) {
                    this.setState({
                        Saturday_name: day.name,
                        Saturday_open: day.open,
                        Saturday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                        Saturday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                    });
                }
                if (day.dayId === 7) {
                    this.setState({
                        Sunday_name: day.name,
                        Sunday_open: day.open,
                        Sunday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                        Sunday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                    });
                }
            });
        }
    }

    openHandler = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    timeHandler = name => event => {
        this.setState({ [name]: moment(event._d).format("HH:mm") });
    }

    onCloseDeleteModal() {
        this.setState({
            deleteModal: false
        })
    }

    onOpenDeleteModal() {
        this.setState({
            deleteModal: true
        })
    }

    onCloseNewOrUpdateModal() {
        this.setState({
            newOrUpdateModal: false
        })
    }

    onOpenNewOrUpdateModal(btn_name) {
        this.setState({
            newOrUpdateModal: true,
            btn_name: btn_name
        })
    }

    render() {
        const { classes } = this.props;

        const buttons = [
            { color: "info", icon: Edit },
            { color: "danger", icon: Close }
        ].map((prop, key) => {
            return (
                <Button color={prop.color} className={classes.actionButton} key={key}>
                    <prop.icon className={classes.icon} />
                </Button>
            );
        });

        let specialDays = [];
        this.props.specialDays.map(day => {
            let temp = [];

            temp.push(day.name);
            temp.push(day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2));
            temp.push(day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2));
            temp.push(buttons);

            specialDays.push(temp);
        })
        console.log('focus: ', this.state.Monday_open)

        return (
            <div>
                <Card>
                    <CardHeader>            
                        <div className={classes.cardHeader}>
                            <GridContainer>
                                <GridItem  xs={12} sm={6}>
                                    <h3 className={classes.cardTitle}>Opening Hours</h3>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="center" className={classes.mb_20}>
                        {
                            this.props.openingHours.map((hour, key) => {
                                return (
                                    <GridItem sm={12} md={10} lg={8} key={key}>
                                        <GridContainer justify="center">
                                            <GridItem xs={8} sm={4} md={4}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={this.state[`${hour.name}_open`]? this.state[`${hour.name}_open`] : false}
                                                            onChange={this.openHandler(`${hour.name}_open`)}
                                                            classes={{
                                                                switchBase: classes.switchBase,
                                                                checked: classes.switchChecked,
                                                                icon: classes.switchIcon,
                                                                iconChecked: classes.switchIconChecked,
                                                                bar: classes.switchBar
                                                            }}
                                                        />
                                                    }
                                                    classes={{
                                                        label: classes.label
                                                    }}
                                                    label={this.state[`${hour.name}_name`]}
                                                />
                                            </GridItem>
                                            <GridItem xs={8} sm={3} md={2}>
                                                <FormControl fullWidth>
                                                    <Datetime
                                                        dateFormat={false}
                                                        timeFormat="HH:mm"
                                                        inputProps={{ placeholder: "From" }}
                                                        value={this.state[`${hour.name}_from`]}
                                                        onChange={this.timeHandler(`${hour.name}_from`)}
                                                    />
                                                </FormControl>
                                            </GridItem>
                                            <GridItem xs={8} sm={3} md={2}>
                                                <FormControl fullWidth>
                                                    <Datetime
                                                        dateFormat={false}
                                                        timeFormat="HH:mm"
                                                        inputProps={{ placeholder: "To" }}
                                                        value={this.state[`${hour.name}_to`]}
                                                        onChange={this.timeHandler(`${hour.name}_to`)}
                                                    />
                                                </FormControl>
                                            </GridItem>
                                        </GridContainer>                          
                                    </GridItem>
                                )
                            })
                        }
                        </GridContainer>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>            
                        <div className={classes.cardHeader}>
                            <GridContainer>
                                <GridItem xs={12} sm={6}>
                                    <h3 className={classes.cardTitle}>Special Days</h3>
                                </GridItem>
                                <GridItem xs={12} sm={6} className={classes.text_right}>
                                    <Button 
                                        color="info" 
                                        onClick={() => this.onOpenNewOrUpdateModal("New")}
                                    >                            
                                        <Add /> Add Special Event
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </CardHeader>
                    <CardBody>                        
                        <GridContainer justify="center">
                            <GridItem sm={12} md={10}>
                                <Table
                                    tableHead={[
                                        "Name",
                                        "From",
                                        "To",
                                        "Actions"
                                    ]}
                                    tableData={specialDays}
                                    customCellClasses={[
                                        classes.center,
                                        classes.center,
                                        classes.center,
                                        classes.center
                                    ]}
                                    customClassesForCells={[0, 1, 2, 3]}
                                    customHeadCellClasses={[
                                        classes.center,
                                        classes.center,
                                        classes.center,
                                        classes.center
                                    ]}
                                    customHeadClassesForCells={[0, 1, 2, 3]}
                                />
                            </GridItem>
                        </GridContainer>

                        <DeleteModal 
                            onOpen={this.state.deleteModal}
                            onClose={this.onCloseDeleteModal.bind(this)} 
                        />
                            
                        <NewOrUpdateModal 
                            onOpen={this.state.newOrUpdateModal}
                            onClose={this.onCloseNewOrUpdateModal.bind(this)} 
                            btn_name={this.state.btn_name}
                        />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

OpeningHours.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId,
        openingHours    : state.hours.openingHours,
        specialDays     : state.hours.specialDays
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserData : Actions.getUserData,
        getHours    : Actions.getHours,
    }, dispatch);
}

export default withStyles(openingHoursStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(OpeningHours)));

