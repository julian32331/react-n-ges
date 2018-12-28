/**
 * Descirption: Saloon Service
 * Date: 12/23/2018
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// core components
import Button from "components/CustomButtons/Button.jsx";

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";

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
                    color="info"
                    size="sm"
                    className={classes.modalSmallFooterFirstButton}
                >
                No
                </Button>
                <Button
                    onClick={() => this.handleClose()}
                    color="danger"
                    size="sm"
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

export default withStyles(commonModalStyle)(DeleteModal);
