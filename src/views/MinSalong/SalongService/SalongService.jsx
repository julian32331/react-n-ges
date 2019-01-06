/**
 * Descirption: Delete modal for saloon service
 * Date: 12/23/2018
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

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

import NewOrEditModal from "./NewOrEditModal.jsx";
import DeleteModal from "views/DeleteModal.jsx";

class SalongService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModal: false,
            newOrEditModal: false,
            modalTitle: '',
            modalData: null
        };
        this.getServices = this.getServices.bind(this);
    }

    componentWillMount() {
        this.props.getUserData();
        setTimeout(() => {
            this.getServices();
        }, 100);
    }

    // Open and close Delete modal
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

    // Open and close NewOrUpdate modal
    onCloseNewOrEditModal() {
        this.setState({
            newOrEditModal: false
        })
    }
    onOpenNewOrEditModal(title, data=null) {
        this.setState({
            newOrEditModal: true,
            modalTitle: title,
            modalData: data
        })
    }

    getServices() {
        console.log('service: ', this.props.id)
        this.props.getServices({
            id: this.props.id
        })
    }

    render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader>            
            <div className={classes.cardHeader}>
                <GridContainer>
                    <GridItem xs={12} sm={6}>
                        <h3 className={classes.cardTitle}>Saloon Service</h3>
                    </GridItem>
                    <GridItem xs={12} sm={6} className={classes.text_right}>
                        <Button 
                            color="info" 
                            onClick={() => this.onOpenNewOrEditModal("New Service")}
                        >                            
                            <Add /> ADD Service
                        </Button>
                    </GridItem>
                </GridContainer>
            </div>
        </CardHeader>
        <CardBody>
            <GridContainer justify="center" className={classes.mb_20}>
                <GridItem xs={11} sm={10} md={10} lg={9}>
                {
                    this.props.data.map((service, key) => {
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
                                            onClick={() => this.onOpenNewOrEditModal("Edit Service", service)}
                                            >
                                            <Create />
                                        </Button>                        
                                        <Button
                                            justIcon
                                            round
                                            color="danger"
                                            size="sm"
                                            className={classes.mx_10}
                                            onClick={() => this.onOpenDeleteModal()}
                                            >
                                            <Close />
                                        </Button>
                                    </div>
                                </GridItem>
                            </GridContainer>
                        )                        
                    })
                }                    
                </GridItem>
            </GridContainer>
            <DeleteModal 
                onOpen={this.state.deleteModal}
                onClose={this.onCloseDeleteModal.bind(this)} 
            />
                
            <NewOrEditModal 
                onOpen={this.state.newOrEditModal}
                onClose={this.onCloseNewOrEditModal.bind(this)}
                modalTitle={this.state.modalTitle}
                data={this.state.modalData}
            />

        </CardBody>
      </Card>
    );
  }
}

SalongService.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        id: state.user.selected_workingForId,
        data: state.service.data
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserData: Actions.getUserData,
        getServices: Actions.getServiceData,
        addService: Actions.setServiceData
    }, dispatch);
}

export default withStyles(salongServiceStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SalongService)));
