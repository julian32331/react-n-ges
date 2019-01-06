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

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";

import * as Validator from "validator";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class NewOrEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.data? this.props.data.name : "",
            titleState: this.props.data? "success" : "",
            time: this.props.data? this.props.data.durationInMinutes : "",
            timeState: this.props.data? "success" : "",
            price: this.props.data? this.props.data.price : "",
            priceState: this.props.data? "success" : "",
            description: this.props.data? this.props.data.description : "",
            descriptionState: this.props.data? "success" : ""
        }
        this.save = this.save.bind(this);
    }

    initState() {
        this.setState({
            title: "",
            titleState: "",
            time: "",
            timeState: "",
            price: "",
            priceState: "",
            description: "",
            descriptionState: ""
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
    }

    save() {
        this.props.addService({
            token: this.props.token,
            workingForId: this.props.workingForId,
            name: this.state.title,
            description: this.state.description,
            price: this.state.price,
            durationInMinutes: this.state.time
        })
        this.initState();
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "title":
                this.setState({
                    title: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "time":
                this.setState({
                    time: event.target.value
                })
                if (Validator.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "price":
                this.setState({
                    price: event.target.value
                })
                if (Validator.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "description":
                this.setState({
                    description: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    canSave() {
        if(this.state.titleState === "success" && this.state.timeState === "success" && this.state.priceState === "success" && this.state.descriptionState === "success") {
            return false;
        } else if(this.props.data) {
            return false;
        } else {
            return true;
        }
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
                            success={this.state.titleState === "success"}
                            error={this.state.titleState === "error"}
                            labelText="Title *"
                            id="title"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                endAdornment:
                                    this.state.titleState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.change(event, "title", "title", 0),
                                type: "text",
                                value: this.state.title
                            }}
                        />
                        <GridContainer>
                            <GridItem xs={6}>
                                <CustomInput
                                    success={this.state.timeState === "success"}
                                    error={this.state.timeState === "error"}
                                    labelText="Time(Mins) *"
                                    id="time"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        endAdornment:
                                            this.state.timeState === "error" ? (
                                            <InputAdornment position="end">
                                                <Warning className={classes.danger} />
                                            </InputAdornment>
                                            ) : (
                                            undefined
                                        ),
                                        onChange: event =>
                                            this.change(event, "time", "time", 0),
                                        type: "number",
                                        value: this.state.time
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={6}>
                                <CustomInput
                                    success={this.state.priceState === "success"}
                                    error={this.state.priceState === "error"}
                                    labelText="Price($) *"
                                    id="price"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        endAdornment:
                                            this.state.priceState === "error" ? (
                                            <InputAdornment position="end">
                                                <Warning className={classes.danger} />
                                            </InputAdornment>
                                            ) : (
                                            undefined
                                        ),
                                        onChange: event =>
                                            this.change(event, "price", "price", 0),
                                        type: "number",
                                        value: this.state.price
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <CustomInput
                            success={this.state.descriptionState === "success"}
                            error={this.state.descriptionState === "error"}
                            labelText="Description *"
                            id="description"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5,
                                endAdornment:
                                    this.state.descriptionState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.change(event, "description", "description", 0),
                                type: "text",
                                value: this.state.description
                            }}
                        />
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
                        onClick={() => this.save()}
                        color="info"
                        size="sm"
                        disabled={this.canSave()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

NewOrEditModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        token           : state.user.token,
        workingForId    : state.user.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addService: Actions.addService
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewOrEditModal)));
