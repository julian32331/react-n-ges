/**
 * Descirption: NewOrUpdate modal for saloon service
 * Date: 12/23/2018
 * Author: Danijel
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// @material-ui/icons
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import saloonModalStyle from "assets/jss/material-dashboard-pro-react/views/saloonService/saloonModalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class NewOrUpdateModal extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClose() {
        this.props.onClose();
    }

    render() {
    const { classes } = this.props;
    return (
        <Dialog
            classes={{
                root: classes.center + " " + classes.modalRoot,
                paper: classes.modal
            }}
            open={this.props.onOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => this.handleClose()}
            aria-labelledby="saloon-service-newOrUpdate-modal-title"
            aria-describedby="saloon-service-newOrUpdate-modal-description"
            >
            <DialogTitle
                id="saloon-service-newOrUpdate-modal-title"
                disableTypography
                className={classes.modalHeader}
            >
                <Button
                    justIcon
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="transparent"
                    onClick={() => this.handleClose()}
                >
                <Close className={classes.modalClose} />
                </Button>
                <h4 className={classes.modalTitle}>{this.props.btn_name} Service</h4>
            </DialogTitle>
            <DialogContent
                id="saloon-service-newOrUpdate-modal-description"
                className={classes.modalBody}
            >
                <form>
                    <CustomInput
                        labelText="Title"
                        id="title"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "text"
                        }}
                    />
                    <GridContainer>
                        <GridItem xs={6}>
                            <CustomInput
                                labelText="Time(Mins)"
                                id="time"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={6}>
                            <CustomInput
                                labelText="Price($)"
                                id="price"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <CustomInput
                        labelText="Description"
                        id="description"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            multiline: true,
                            rows: 5
                        }}
                    />
              </form>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                <Button 
                    color="transparent"
                    onClick={() => this.handleClose()}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => this.handleClose()}
                    color="info"
                    simple
                >
                    {this.props.btn_name}
                </Button>
            </DialogActions>
        </Dialog>
    );
  }
}

NewOrUpdateModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(saloonModalStyle)(NewOrUpdateModal);
