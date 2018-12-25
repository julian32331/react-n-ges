/**
 * Descirption: Delete modal for saloon service
 * Date: 12/23/2018
 * Author: Danijel
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

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

import saloonServiceStyle from "assets/jss/material-dashboard-pro-react/views/saloonService/saloonServiceStyle.jsx";

import DeleteModal from "./deleteModal";
import NewOrUpdateModal from "./newOrUpdateModal";

class SaloonService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModal: false,
            newOrUpdateModal: false,
            btn_name: ''
        };
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
    return (
      <Card>
        <CardHeader>            
            <div className={classes.cardHeader}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <h3 className={classes.cardTitle}>Saloon Service</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} className={classes.text_right}>
                        <Button 
                            color="info" 
                            onClick={() => this.onOpenNewOrUpdateModal("New")}
                        >                            
                            <Add /> ADD USER
                        </Button>
                    </GridItem>
                </GridContainer>
            </div>
        </CardHeader>
        <CardBody>
            <GridContainer justify="center" className={classes.mb_20}>
                <GridItem md={10} lg={9}>
                    <GridContainer>
                        <GridItem md={3} className={classes.bg_title}>
                            <div className={classes.title_container}>                            
                                <div className={classes.title}>Herreklipp</div>
                                <div className={classes.time}><span className={classes.title_item}>Tid</span>: 45min</div>
                                <div><span style={{fontSize: '16px', fontWeight: '400'}}>Pris kr</span>: 349</div>
                            </div>
                        </GridItem>
                        <GridItem md={7} className={classes.bg_content}>
                            <div className={classes.py_15}>
                                This is service description. This is service description. This is service description. This is service description. This is service description.This is service description.
                                This is service description. This is service description. This is service description. This is service description. This is service description.This is service description.
                            </div>
                        </GridItem>
                        <GridItem md={2} className={classes.btn_container}>
                            <div className={classes.py_15}>
                                <Button
                                    justIcon
                                    round
                                    color="info"
                                    size="sm"
                                    className={classes.mx_10}
                                    onClick={() => this.onOpenNewOrUpdateModal("Update")}
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
                </GridItem>
            </GridContainer>
            <GridContainer justify="center" className={classes.mb_20}>
                <GridItem md={10} lg={9}>
                    <GridContainer>
                        <GridItem md={3} className={classes.bg_title}>
                            <div className={classes.title_container}>                            
                                <div className={classes.title}>Herreklipp</div>
                                <div className={classes.time}><span className={classes.title_item}>Tid</span>: 45min</div>
                                <div><span style={{fontSize: '16px', fontWeight: '400'}}>Pris kr</span>: 349</div>
                            </div>
                        </GridItem>
                        <GridItem md={7} className={classes.bg_content}>
                            <div className={classes.py_15}>
                                This is service description. This is service description. This is service description. This is service description. This is service description.This is service description.
                                This is service description. This is service description. This is service description. This is service description. This is service description.This is service description.
                            </div>
                        </GridItem>
                        <GridItem md={2} className={classes.btn_container}>
                            <div className={classes.py_15}>
                                <Button
                                    justIcon
                                    round
                                    color="info"
                                    size="sm"
                                    className={classes.mx_10}
                                    onClick={() => this.onOpenNewOrUpdateModal("Update")}
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
                </GridItem>
            </GridContainer>
            <GridContainer justify="center" className={classes.mb_20}>
                <GridItem md={10} lg={9}>
                    <GridContainer>
                        <GridItem md={3} className={classes.bg_title}>
                            <div className={classes.title_container}>                            
                                <div className={classes.title}>Herreklipp</div>
                                <div className={classes.time}><span className={classes.title_item}>Tid</span>: 45min</div>
                                <div><span style={{fontSize: '16px', fontWeight: '400'}}>Pris kr</span>: 349</div>
                            </div>
                        </GridItem>
                        <GridItem md={7} className={classes.bg_content}>
                            <div className={classes.py_15}>
                                This is service description. This is service description. This is service description. This is service description. This is service description.This is service description.
                                This is service description. This is service description. This is service description. This is service description. This is service description.This is service description.
                            </div>
                        </GridItem>
                        <GridItem md={2} className={classes.btn_container}>
                            <div className={classes.py_15}>
                                <Button
                                    justIcon
                                    round
                                    color="info"
                                    size="sm"
                                    className={classes.mx_10}
                                    onClick={() => this.onOpenNewOrUpdateModal("Update")}
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
    );
  }
}

SaloonService.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(saloonServiceStyle)(SaloonService);
