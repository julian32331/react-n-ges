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

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Create from "@material-ui/icons/Create";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import salongServiceStyle from "assets/jss/material-dashboard-pro-react/views/salongService/salongServiceStyle.jsx";

import NewOrUpdateModal from "./NewOrUpdateModal.jsx";
import DeleteModal from "./DeleteModal.jsx";
import * as Utils from 'utils';

class SalongService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModal: false,
            newOrUpdateModal: false,
            modalTitle: '',
            modalData: null
        };
    }

    componentWillMount() {
        this.props.getUserData();
        setTimeout(() => {
            this.props.getSalonServices({
                workingForId: this.props.workingForId
            })
        }, 100);
    }

    componentWillReceiveProps(nextProps) {
        console.log('called props: ', nextProps.services);
        if(this.props.workingForId !== nextProps.workingForId) {
            this.props.getSalonServices({
                workingForId: nextProps.workingForId
            })
        }
    }

    // Open and close Delete modal
    onCloseDeleteModal() {
        this.setState({
            deleteModal: false
        })
    }
    onOpenDeleteModal(service) {
        this.setState({
            deleteModal: true,            
            modalData: service
        })
    }

    // Open and close NewOrUpdate modal
    onCloseNewOrUpdateModal() {
        this.setState({
            newOrUpdateModal: false
        })
    }
    onOpenNewOrUpdateModal(title, service=null) {
        if(service) {
            this.setState({
                loading: true
            })
            Utils.xapi().post('manager/service/employees', {
                workingForId: this.props.workingForId,
                serviceId: service.id
            }).then(res => {
                let arr = [];
                res.data.Employees.map(employee => {
                    arr.push(employee.id)
                })
                this.setState({
                    loading: false,
                    newOrUpdateModal: true,
                    modalTitle: title,
                    modalData: service,
                    employees: arr
                })
            })
        } else {
            this.setState({
                newOrUpdateModal: true,
                modalTitle: title,
                modalData: service,
                employees: null
            })
        }
    }

    render() {
        const { classes } = this.props;
        const loading = this.props.loading || this.state.loading;
        return (
            <Card classes={{card: classes.card}}>
                <CardHeader>            
                    <div className={classes.cardHeader}>
                        <GridContainer>
                            <GridItem xs={12} sm={6}>
                                <h3 className={classes.cardTitle}>Salongstjänster</h3>
                            </GridItem>
                            <GridItem xs={12} sm={6} className={classes.text_right}>
                                <Button 
                                    color="info" 
                                    size="sm"
                                    onClick={() => this.onOpenNewOrUpdateModal("Ny tjänst", null)}
                                >                            
                                    <Add /> Lägg till tjänst
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </div>
                </CardHeader>
                <CardBody>
                    {
                        loading &&
                            <div className={classes.loading_container}>
                                <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                            </div>
                    }
                    <GridContainer justify="center" className={classes.mb_20}>
                        <GridItem xs={11} sm={10} md={10} lg={9}>
                        {
                            this.props.services.length > 0 &&
                                this.props.services.map((service, key) => {
                                    return (
                                        <GridContainer key={key} className={classes.mb_20}>
                                            <GridItem xs={12} md={3} className={classes.bg_title}>
                                                <div className={classes.title_container}> 
                                                    <GridContainer>
                                                        <GridItem xs={12}>
                                                            <div className={classes.title}>{service.name}</div>
                                                        </GridItem>
                                                        <GridItem xs={6} md={12}>
                                                            <div className={classes.time}><span className={classes.title_item}>Tid :&nbsp;&nbsp;</span> {service.durationInMinutes}min</div>
                                                        </GridItem>
                                                        <GridItem xs={6} md={12}>
                                                            <div className={classes.price}><span className={classes.title_item}>Pris kr :&nbsp;&nbsp;</span> {service.price}</div>
                                                        </GridItem>
                                                    </GridContainer>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} md={7} className={classes.bg_content}>
                                                {service.description}
                                            </GridItem>
                                            <GridItem xs={12} md={2} className={classes.btn_container}>
                                                <div className={classes.py_15}>
                                                    <Button
                                                        justIcon
                                                        round
                                                        color="info"
                                                        size="sm"
                                                        className={classes.mx_10}
                                                        onClick={() => this.onOpenNewOrUpdateModal("Update Service", service)}
                                                    >
                                                        <Create />
                                                    </Button>                        
                                                    <Button
                                                        justIcon
                                                        round
                                                        color="danger"
                                                        size="sm"
                                                        className={classes.mx_10}
                                                        onClick={() => this.onOpenDeleteModal(service)}
                                                    >
                                                        <Close />
                                                    </Button>
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                    )                        
                                })
                        }
                        {
                            !this.props.loading && this.props.services.length === 0 &&
                                <h4 style={{textAlign: 'center'}}>No Services</h4>                           
                        }                    
                        </GridItem>
                    </GridContainer>
                </CardBody>
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
                    selectedEmployees={this.state.employees}
                />
            </Card>
        );
    }
}

SalongService.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId,
        loading         : state.my_salon.services.loading,
        error           : state.my_salon.services.error,
        services        : state.my_salon.services.services
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserData         : Actions.getUserData,
        getSalonServices    : Actions.getSalonServices,
    }, dispatch);
}

export default withStyles(salongServiceStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SalongService)));
