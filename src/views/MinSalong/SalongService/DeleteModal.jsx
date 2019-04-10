/**
 * Descirption: Saloon Service
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
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// @material-ui/icons
import ErrorOutline from "@material-ui/icons/ErrorOutline";

// core components
import Button from "components/CustomButtons/Button.jsx";

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    delete() {
        this.props.deleteSalonService({
            workingForId: this.props.workingForId,
            id: this.props.id
        })
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
                aria-labelledby="saloon-service-delete-modal-title"
                aria-describedby="saloon-service-delete-modal-description"
            >
                <DialogContent
                    id="saloon-service-delete-modal-description"
                    className={
                    classes.modalBody + " " + classes.modalSmallBody
                    }
                >
                    <ErrorOutline className={classes.danger + " " + classes.warning_icon} />
                    <h3>Are you sure?</h3>
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
                        onClick={() => this.delete()}
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

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteSalonService: Actions.deleteSalonService
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteModal)));
