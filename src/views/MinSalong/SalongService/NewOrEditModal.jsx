/**
 * Descirption: NewOrUpdate modal for saloon service
 * Date: 12/23/2018
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
            title: "qweqwe",
            titleState: "",
            time: "",
            timeState: "",
            price: "",
            priceState: "",
            description: "",
            descriptionState: ""
        }
    }

    handleClose() {
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "title":
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "time":
                if (Validator.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "price":
                if (Validator.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "description":
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
        if(this.state.titleState === "" || this.state.titleState === "error" || 
            this.state.timeState === "" || this.state.timeState === "error" ||
            this.state.priceState === "" || this.state.priceState === "error" ||
            this.state.descriptionState === "" || this.state.descriptionState === "error") {
          return true
        } else {
          return false
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
                    <h3 className={classes.modalTitle}>{this.props.title}</h3>
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
                                type: "text"
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
                                        type: "number"
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
                                        type: "number"
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
                                type: "text"
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
                        onClick={() => this.handleClose()}
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

export default withStyles(commonModalStyle)(NewOrEditModal);
