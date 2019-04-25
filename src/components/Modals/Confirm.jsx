/**
 * Descirption: Confirm Modal
 * Date: 4/25/2019
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// @material-ui/icons
import ErrorOutline from "@material-ui/icons/ErrorOutline";

// core components
import Button from "components/CustomButtons/Button.jsx";

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class Confirm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClose() {
        this.props.onClose();
    }

    handleConfirm() {
        this.props.onConfirm();
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
                onClose={() => {this.handleClose()}}
                aria-labelledby="confirm-modal-title"
                aria-describedby="confirm-modal-description"
            >
                <DialogContent
                    id="confirm-modal-description"
                    className={
                    classes.modalBody + " " + classes.modalSmallBody
                    }
                >
                    <ErrorOutline className={classes.warning_icon} />
                    <h3 className={classes.mt_0}>Are you sure?</h3>
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
                    >
                    No
                    </Button>
                    <Button
                        onClick={() => this.handleConfirm()}
                        color="danger"
                        size="sm"
                    >
                    Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Confirm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(modalStyle)(Confirm);
