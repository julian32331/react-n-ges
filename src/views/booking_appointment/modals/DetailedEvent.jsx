/**
 * Description: Event detail Modal
 * Date: 4/22/2019
 */

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// @material-ui/icons
import Delete from "@material-ui/icons/Delete";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class DetailedEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteEvent = () => {
        this.props.onDelete();
        this.props.onClose();
    }

    render() {
        const { classes, data } = this.props;
        
        return (
            <Dialog
                classes={{
                    root: classes.center + " " + classes.modalRoot,
                    paper: classes.modal
                }}
                    open={this.props.onOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.props.onClose()}
                    aria-labelledby="setting-break-time-title"
                    aria-describedby="setting-break-time-description"
                >
                <DialogTitle
                    id="setting-break-time-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <Button
                        justIcon
                        round
                        color="danger"
                        size="sm"
                        className={classes.modalCloseButton}
                        onClick={this.deleteEvent}
                    >
                        <Delete className={classes.modalClose} />
                    </Button>
                    <h3 className={classes.modalTitle}>Bokningsdetaljer</h3>
                </DialogTitle>
                <DialogContent
                    id="setting-break-time-description"
                    className={classes.modalBody}
                >
                    <GridContainer>
                        {
                            data && data.bookingType === "SELFBOOKING" &&                                
                                <GridItem xs={12} sm={6} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}><b>Kundens namn: </b></h4>
                                </GridItem>
                        }
                        {
                            data && data.bookingType === "SELFBOOKING" &&      
                                <GridItem xs={12} sm={6} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}>{data? data.consumerName : ""}</h4>
                                </GridItem>
                        }
                        {
                            data && data.bookingType === "SELFBOOKING" &&  
                                <GridItem xs={12} sm={6} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}><b>E-post: </b></h4>
                                </GridItem>
                        }
                        {
                            data && data.bookingType === "SELFBOOKING" &&
                                <GridItem xs={12} sm={6} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}>{data? data.consumerEmail : ""}</h4>
                                </GridItem>
                        }
                        {
                            data && data.bookingType === "SELFBOOKING" &&  
                                <GridItem xs={12} sm={6} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}><b>Mobil: </b></h4>
                                </GridItem>
                        }
                        {
                            data && data.bookingType === "SELFBOOKING" &&
                                <GridItem xs={12} sm={6} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}>{data? data.consumerMobile : ""}</h4>
                                </GridItem>
                        }
                        <GridItem xs={12} sm className={classes.left}>
                            <h4 style={{marginTop: '0'}}><b>Tid: </b></h4>
                        </GridItem>
                        <GridItem xs={12} sm={6} className={classes.left}>
                            <h4 style={{marginTop: '0'}}>{data? moment(data.plannedStartTime).format('YYYY-MM-DD HH:mm') + " - " + moment(data.plannedEndTime).format('HH:mm') : ""}</h4>
                        </GridItem>
                        {
                            data && data.bookingType === "SELFBOOKING" &&  
                                <GridItem xs={12} sm={6} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}><b>Bokad tjänst: </b></h4>
                                </GridItem>
                        }
                        {
                            data && data.bookingType === "SELFBOOKING" &&
                                <GridItem xs={12} sm={6} className={classes.left}>
                                    <h4 style={{marginTop: '0'}}>{data? data.service : ""}</h4>
                                </GridItem>
                        }
                        <GridItem xs={12} sm={6} className={classes.left}>
                            <h4 style={{marginTop: '0'}}><b>Fris: </b></h4>
                        </GridItem>
                        <GridItem xs={12} sm={6} className={classes.left}>
                            <h4 style={{marginTop: '0'}}>{data? data.employee : ""}</h4>
                        </GridItem>
                        <GridItem xs={12} className={classes.left}>
                            <h4 style={{marginTop: '0'}}><b>Kommentar: </b></h4>
                        </GridItem>
                        <GridItem xs={12} className={classes.left}>
                            <p style={{marginLeft: '15px'}}>{data? data.comment : ""}</p>
                        </GridItem>
                    </GridContainer>
                </DialogContent>
            </Dialog>
        );
  }
}

DetailedEvent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(modalStyle)((DetailedEvent));
