/**
 * Descirption: Salon Open Hours
 * Date: 4/29/2019
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
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";
import Confirm from "components/Modals/Confirm.jsx";

import hoursStyle from "assets/jss/material-dashboard-pro-react/views/my_salon/hours/hoursStyle.jsx";
import AddUpdate from "./modals/AddUpdate";

class Hours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete: false,
            showAddUpdate: false,
            modalTitle: '',
            modalData: null,
            isEditHours: false,
            isChangedHours: false
        };
    }

    componentWillMount() {
        this.props.getUser().then(() => {
            this.props.getSalonHours({
                workingForId: this.props.workingForId
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.workingForId !== nextProps.workingForId) {
            this.props.getSalonHours({
                workingForId: nextProps.workingForId
            })
        }
        if (nextProps.openingHours) {
            this.initOpeninHours(nextProps.openingHours);
        }
    }

    // Openning hours Actions
    initOpeninHours = (data) => {
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
            isChangedHours: true
        });
    };
    timeHandler = name => event => {
        this.setState({ 
            [name]: moment(event._d).format("HH:mm"),
            isChangedHours: true
        });
    }
    updateSalonHours = () => {
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
        this.props.updateSalonHours({
            workingForId: this.props.workingForId,
            openingHoursData: openingHours
        })
        this.setState({
            isEditHours: false, 
            isChangedHours: false
        })
    }
    cancelUpdateSalonHours = () => {
        this.setState({
            isEditHours: false, 
            isChangedHours: false
        });
        this.initOpeninHours(this.props.openingHours)
    }

    // Confirm modal Actions
    onCloseConfirm() {
        this.setState({
            showDelete: false
        })
    }
    onOpenConfirm(data) {
        this.setState({
            showDelete  : true,
            modalData   : data
        })
    }
    onConfirmDelete() {
        this.props.deleteSalonSpecialDay({
            workingForId: this.props.workingForId,
            specialDayId: this.state.modalData.id
        })
    }

    // AddUpdate modal Actions
    onCloseAddUpdate() {
        this.setState({
            showAddUpdate: false
        })
    }
    onOpenAddUpdate(title, data=null) {
        this.setState({
            showAddUpdate   : true,
            modalTitle      : title,
            modalData       : data
        })
    }

    render() {
        const { classes, loading } = this.props;

        const buttons = data => {
            return (
                <div>
                    <Button color="info" className={classes.actionButton} onClick={() => this.onOpenAddUpdate("Update Special Day", data)}>
                        <Edit className={classes.icon} />
                    </Button>                
                    <Button color="danger" className={classes.actionButton} onClick={() => this.onOpenConfirm(data)}>
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
                <Card classes={{card: classes.card1}}>
                {
                    loading &&
                        <div className={classes.loading_container}>
                            <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                        </div>
                }
                {
                    !loading &&
                        <div>
                        <CardHeader>            
                            <div className={classes.cardHeader}>
                                <GridContainer>
                                    <GridItem  xs={12} sm={6}>
                                        <h3 className={classes.cardTitle}>Salongen öppen</h3>
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
                                                                disabled={!this.state.isEditHours}
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
                                                                    inputProps={{ placeholder: "From", disabled: !this.state.isEditHours }}
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
                                                                    inputProps={{ placeholder: "To", disabled: !this.state.isEditHours }}
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
                                this.state.isEditHours? (
                                    <GridItem sm={12} className={classes.right}>
                                        <Button 
                                            color="danger"
                                            size="sm"
                                            className={classes.mr_8}
                                            onClick={() => this.cancelUpdateSalonHours()}
                                        >                            
                                            Cancel
                                        </Button>
                                        <Button 
                                            color="info"
                                            size="sm"
                                            disabled={!this.state.isChangedHours}
                                            onClick={() => this.updateSalonHours()}
                                        >                            
                                            Save
                                        </Button>
                                    </GridItem>
                                ) : (
                                    <GridItem sm={12} className={classes.right}>
                                        <Button 
                                            color="info"
                                            size="sm"
                                            onClick={() => this.setState({ isEditHours: true })}
                                        >                            
                                            Redigera
                                        </Button>
                                    </GridItem>
                                )
                            }    
                            </GridContainer>
                        </CardBody>
                    </div>
                }
                </Card>
                <Card classes={{card: classes.card2}}>
                {
                    loading &&
                        <div className={classes.loading_container}>
                            <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                        </div>
                }
                {
                    !loading &&
                        <div>
                        <CardHeader>            
                            <div className={classes.cardHeader}>
                                <GridContainer>
                                    <GridItem xs={12} sm={6}>
                                        <h3 className={classes.cardTitle}>Ny specialdag</h3>
                                    </GridItem>
                                    <GridItem xs={12} sm={6} className={classes.right}>
                                        <Button 
                                            color="info" 
                                            size="sm"
                                            onClick={() => this.onOpenAddUpdate("Ny specialdag")}
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
                                            classes.center + " " + classes.td,
                                            classes.center
                                        ]}
                                        customClassesForCells={[0, 1, 2, 3, 4]}
                                        customHeadCellClasses={[
                                            classes.center + " " + classes.th,
                                            classes.center + " " + classes.th,
                                            classes.center + " " + classes.th,
                                            classes.center + " " + classes.th,
                                            classes.center
                                        ]}
                                        customHeadClassesForCells={[0, 1, 2, 3, 4]}
                                    />
                                </GridItem>
                            </GridContainer>
                            
                            <Confirm
                                onOpen={this.state.showDelete}
                                onClose={this.onCloseConfirm.bind(this)}
                                onConfirm={this.onConfirmDelete.bind(this)}
                            />                  
                            <AddUpdate 
                                onOpen={this.state.showAddUpdate}
                                onClose={this.onCloseAddUpdate.bind(this)}
                                modalTitle={this.state.modalTitle}
                                data={this.state.modalData}
                            />

                        </CardBody>
                    </div>
                }
                </Card>
            </div>
        );
    }
}

Hours.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.auth.workingForId,
        loading         : state.my_salon.hours.loading,    
        openingHours    : state.my_salon.hours.openingHours,
        specialDays     : state.my_salon.hours.specialDays
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser                 : Actions.getUser,
        getSalonHours           : Actions.getSalonHours,
        updateSalonHours        : Actions.updateSalonHours,
        deleteSalonSpecialDay   : Actions.deleteSalonSpecialDay
    }, dispatch);
}

export default withStyles(hoursStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Hours)));

