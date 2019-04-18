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

import DeleteModal from "./DeleteModal";
import NewOrUpdateModal from "./NewOrUpdateModal";

class OpeningHours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModal: false,
            newOrUpdateModal: false,
            modalTitle: '',
            modalData: null,
            canUpdateHours: true,
            isEdit: false
        };
        this.getHours = this.getHours.bind(this);
        this.updateHours = this.updateHours.bind(this);
        this.initOpeninHours = this.initOpeninHours.bind(this);
    }

    componentWillMount() {
        this.props.getUserData();
        setTimeout(() => {
            this.getHours(this.props.workingForId);
        }, 100);
    }
    
    getHours(id) {
        this.props.getHours({
            workingForId: id
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.workingForId !== nextProps.workingForId) {
            this.getHours(nextProps.workingForId);
        }
        if (nextProps.openingHours) {
            this.initOpeninHours(nextProps.openingHours);
        }
    }

    initOpeninHours(data) {
        data.map(day => {
            if (day.dayId === 0) {
                this.setState({
                    Sunday_id: day.id,
                    Sunday_dayId: day.dayId,
                    Sunday_name: day.name,
                    Sunday_open: day.open,
                    Sunday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                    Sunday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                });
            }
            if (day.dayId === 1) {
                this.setState({
                    Monday_id: day.id,
                    Monday_dayId: day.dayId,
                    Monday_name: day.name,
                    Monday_open: day.open,
                    Monday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                    Monday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                });
            }
            if (day.dayId === 2) {
                this.setState({
                    Tuesday_id: day.id,
                    Tuesday_dayId: day.dayId,
                    Tuesday_name: day.name,
                    Tuesday_open: day.open,
                    Tuesday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                    Tuesday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                });
            }
            if (day.dayId === 3) {
                this.setState({
                    Wednesday_id: day.id,
                    Wednesday_dayId: day.dayId,
                    Wednesday_name: day.name,
                    Wednesday_open: day.open,
                    Wednesday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                    Wednesday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                });
            }
            if (day.dayId === 4) {
                this.setState({
                    Thursday_id: day.id,
                    Thursday_dayId: day.dayId,
                    Thursday_name: day.name,
                    Thursday_open: day.open,
                    Thursday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                    Thursday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                });
            }
            if (day.dayId === 5) {
                this.setState({
                    Friday_id: day.id,
                    Friday_dayId: day.dayId,
                    Friday_name: day.name,
                    Friday_open: day.open,
                    Friday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                    Friday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                });
            }
            if (day.dayId === 6) {
                this.setState({
                    Saturday_id: day.id,
                    Saturday_dayId: day.dayId,
                    Saturday_name: day.name,
                    Saturday_open: day.open,
                    Saturday_from: day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2),
                    Saturday_to: day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2)
                });
            }
        });
    }

    openHandler = name => event => {
        this.setState({ 
            [name]: event.target.checked,
            canUpdateHours: false
        });
    };

    timeHandler = name => event => {
        this.setState({ 
            [name]: moment(event._d).format("HH:mm"),
            canUpdateHours: false
        });
    }

    onCloseDeleteModal() {
        this.setState({
            deleteModal: false
        })
    }
    onOpenDeleteModal(data) {
        this.setState({
            deleteModal: true,
            modalData: data
        })
    }

    onCloseNewOrUpdateModal() {
        this.setState({
            newOrUpdateModal: false
        })
    }
    onOpenNewOrUpdateModal(title, data=null) {
        this.setState({
            newOrUpdateModal: true,
            modalTitle: title,
            modalData: data
        })
    }

    updateHours() {
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let openingHours = [];
        days.map(day => {
            let temp = {};

            temp.id = this.state[day + '_id'];
            temp.dayId = this.state[day + '_dayId'];
            temp.name = this.state[day + '_name'];
            temp.open = this.state[day + '_open'];
            temp.openAt = this.state[day + '_from'].replace(":", "");
            temp.closeAt = this.state[day + '_to'].replace(":", "");

            openingHours.push(temp);
        });
        this.props.updateHours({
            workingForId: this.props.workingForId,
            openingHoursData: openingHours
        })
    }

    render() {
        const { classes } = this.props;

        const buttons = data => {
            return (
                <div>
                    <Button color="info" className={classes.actionButton} onClick={() => this.onOpenNewOrUpdateModal("Update Special Day", data)}>
                        <Edit className={classes.icon} />
                    </Button>                
                    <Button color="danger" className={classes.actionButton} onClick={() => this.onOpenDeleteModal(data)}>
                        <Close className={classes.icon} />
                    </Button>
                </div>                
            )
        }

        let specialDays = [];
        this.props.specialDays.map(day => {
            let temp = [];

            temp.push(day.name);
            temp.push(moment(day.date).format("YYYY-MM-DD"));
            temp.push(day.openAt.substr(0,2) + ":" + day.openAt.substr(2,2));
            temp.push(day.closeAt.substr(0,2) + ":" + day.closeAt.substr(2,2));
            temp.push(buttons(day));

            specialDays.push(temp);
        })

        return (
            <div>
                <Card>
                    <CardHeader>            
                        <div className={classes.cardHeader}>
                            <GridContainer>
                                <GridItem  xs={12} sm={6}>
                                    <h3 className={classes.cardTitle}>Salong öppen</h3>
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
                                                            disabled={!this.state.isEdit}
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
                                            {
                                                this.state[`${hour.name}_open`]? (
                                                    <GridItem xs={8} sm={4} md={3}>
                                                    <GridContainer>
                                                    <GridItem xs={6}>
                                                        <FormControl fullWidth>
                                                            <Datetime
                                                                dateFormat={false}
                                                                timeFormat="HH:mm"
                                                                inputProps={{ placeholder: "From", disabled: !this.state.isEdit }}
                                                                value={this.state[`${hour.name}_from`]}
                                                                onChange={this.timeHandler(`${hour.name}_from`)}
                                                            />
                                                        </FormControl>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                        <FormControl fullWidth>
                                                            <Datetime
                                                                dateFormat={false}
                                                                timeFormat="HH:mm"
                                                                inputProps={{ placeholder: "To", disabled: !this.state.isEdit }}
                                                                value={this.state[`${hour.name}_to`]}
                                                                onChange={this.timeHandler(`${hour.name}_to`)}
                                                            />
                                                        </FormControl>
                                                    </GridItem>
                                                    </GridContainer>
                                                    </GridItem>
                                                ) : (
                                                    <GridItem xs={8} sm={4} md={3}>                                                        
                                                    
                                                    </GridItem>
                                                )
                                            }
                                            
                                        </GridContainer>                          
                                    </GridItem>
                                )
                            })
                        }
                        {                            
                            this.state.isEdit? (
                                <GridItem sm={12} className={classes.text_right}>
                                    <Button 
                                        color="danger"
                                        size="sm"
                                        onClick={() => {this.setState({ isEdit: false, canUpdateHours: true }); this.initOpeninHours(this.props.openingHours)}}
                                    >                            
                                        Cancel
                                    </Button>
                                    <Button 
                                        color="info"
                                        size="sm"
                                        disabled={this.state.canUpdateHours}
                                        onClick={() => {this.updateHours(); this.setState({ isEdit: false, canUpdateHours: true })}}
                                    >                            
                                        Save
                                    </Button>
                                </GridItem>
                            ) : (
                                <GridItem sm={12} className={classes.text_right}>
                                    <Button 
                                        color="info"
                                        size="sm"
                                        onClick={() => this.setState({ isEdit: true })}
                                    >                            
                                        Redigera
                                    </Button>
                                </GridItem>
                            )
                        }    
                        </GridContainer>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>            
                        <div className={classes.cardHeader}>
                            <GridContainer>
                                <GridItem xs={12} sm={6}>
                                    <h3 className={classes.cardTitle}>Ny specialdag</h3>
                                </GridItem>
                                <GridItem xs={12} sm={6} className={classes.text_right}>
                                    <Button 
                                        color="info" 
                                        size="sm"
                                        onClick={() => this.onOpenNewOrUpdateModal("New Special Day")}
                                    >                            
                                        <Add /> Lägg till avvikande öppettider
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
                                        "Namn",
                                        "Datum",
                                        "Från",
                                        "Till",
                                        "Åtgärder"
                                    ]}
                                    tableData={specialDays}
                                    customCellClasses={[
                                        classes.center + " " + classes.td,
                                        classes.center + " " + classes.td,
                                        classes.center + " " + classes.td,
                                        classes.center + " " + classes.td
                                    ]}
                                    customClassesForCells={[0, 1, 2, 3]}
                                    customHeadCellClasses={[
                                        classes.center + " " + classes.th,
                                        classes.center + " " + classes.th,
                                        classes.center + " " + classes.th,
                                        classes.center + " " + classes.th
                                    ]}
                                    customHeadClassesForCells={[0, 1, 2, 3]}
                                />
                            </GridItem>
                        </GridContainer>

                        <DeleteModal 
                            onOpen={this.state.deleteModal}
                            onClose={this.onCloseDeleteModal.bind(this)}
                            id={this.state.modalData? this.state.modalData.id : null}
                        />                      
                        <NewOrUpdateModal 
                            onOpen={this.state.newOrUpdateModal}
                            onClose={this.onCloseNewOrUpdateModal.bind(this)}
                            modalTitle={this.state.modalTitle}
                            data={this.state.modalData}
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
        updateHours : Actions.updateHours
    }, dispatch);
}

export default withStyles(openingHoursStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(OpeningHours)));

