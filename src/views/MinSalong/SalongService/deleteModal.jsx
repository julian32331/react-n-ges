/**
 * Descirption: Saloon Service
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
import Button from "components/CustomButtons/Button.jsx";

import saloonModalStyle from "assets/jss/material-dashboard-pro-react/views/saloonService/saloonModalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class DeleteModal extends React.Component {
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
                paper: classes.modal + " " + classes.modalSmall
            }}
            open={this.props.onOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {this.handleClose()}}
            aria-labelledby="saloon-service-remove-modal-title"
            aria-describedby="saloon-service-remove-modal-description"
        >
            <DialogTitle
                id="saloon-service-remove-modal-title"
                disableTypography
                className={classes.modalHeader}
            >
                {/* <Button
                    justIcon
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="transparent"
                    onClick={() => this.handleClose()}
                >
                    <Close className={classes.modalClose} />
                </Button> */}
            </DialogTitle>
            <DialogContent
                id="saloon-service-remove-modal-description"
                className={
                classes.modalBody + " " + classes.modalSmallBody
                }
            >
                <h5>Are you sure you want to delete this?</h5>
            </DialogContent>
            <DialogActions
                className={
                    classes.modalFooter +
                    " " +
                    classes.modalFooterCenter
                }
            >
                <Button
                    onClick={() => this.handleClose()}
                    color="transparent"
                    className={classes.modalSmallFooterFirstButton}
                >
                No
                </Button>
                <Button
                    onClick={() => this.handleClose()}
                    color="danger"
                    simple
                    className={
                        classes.modalSmallFooterFirstButton +
                        " " +
                        classes.modalSmallFooterSecondButton
                    }
                >
                Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
  }
}

DeleteModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(saloonModalStyle)(DeleteModal);
