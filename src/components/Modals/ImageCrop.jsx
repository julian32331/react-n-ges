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

// core components
import Button from "components/CustomButtons/Button.jsx";

import Avatar from 'react-avatar-edit'
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class ImageCrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: null
        }
    }

    handleClose() {
        this.props.onClose();
    }

    handleConfirm() {
        this.props.onSave(this.state.avatar);
        this.props.onClose();
    }
    
    onCrop = (preview) => {
        fetch(preview)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "avatar.png")
                this.setState({
                    avatar: file
                })
        })
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
                    <Avatar
                        width={'100%'}
                        height={300}
                        onCrop={this.onCrop}
                        onBeforeFileLoad={this.onBeforeFileLoad}
                    />
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
                        color="danger"
                        size="sm"
                    >
                    Cancel
                    </Button>
                    <Button
                        onClick={() => this.handleConfirm()}
                        color="info"
                        size="sm"
                    >
                    Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ImageCrop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(modalStyle)(ImageCrop);
