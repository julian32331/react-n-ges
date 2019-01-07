/**
 * Descirption: NewOrUpdate modal for saloon service
 * Date: 12/23/2018
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";

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
                    <h3 className={classes.modalTitle}>{this.props.modalTitle}</h3>
                </DialogTitle>
                <DialogContent
                    id="saloon-service-newOrUpdate-modal-description"
                    className={classes.modalBody}
                >
                    <form>
                        <CustomInput
                            labelText="Name"
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                            }}
                        />                       
                        <GridContainer style={{paddingTop: '27px', marginBottom: '17px',}}>
                            <GridItem xs={12} sm={12} md={4}>                            
                                <FormControl fullWidth>
                                    <Datetime
                                        timeFormat={false}
                                        inputProps={{ placeholder: "Date" }}
                                    />
                                </FormControl> 
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <FormControl fullWidth>
                                    <Datetime
                                        dateFormat={false}
                                        timeFormat={"HH:mm"}
                                        inputProps={{ placeholder: "From" }}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <FormControl fullWidth>
                                    <Datetime
                                        dateFormat={false}
                                        timeFormat={"HH:mm"}
                                        inputProps={{ placeholder: "To" }}
                                    />
                                </FormControl>
                            </GridItem>
                        </GridContainer>
                </form>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button 
                        color="danger"
                        size="sm"
                        onClick={() => this.handleClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.handleClose()}
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

NewOrUpdateModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addSpecialDay      : Actions.addSpecialDay,
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewOrUpdateModal)));
