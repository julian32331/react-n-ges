/**
 * Descirption: Add Update Salon hours
 * Date: 4/29/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
import moment from 'moment';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";
import * as Validator from "utils/validator";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class AddUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name        : "",
            nameState   : "",
            isOpened    : true,
            date        : "",
            dateState   : "",
            from        : "",
            fromState   : "",
            to          : "",
            toState     : ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            this.setState({
                name        : nextProps.data.name,
                nameState   : "success",
                date        : moment(nextProps.data.date).format("YYYY-MM-DD"),
                dateState   : "success",
                from        : nextProps.data.openAt.substr(0,2) + ":" + nextProps.data.openAt.substr(2,2),
                fromState   : "success",
                to          : nextProps.data.closeAt.substr(0,2) + ":" + nextProps.data.closeAt.substr(2,2),
                toState     : "success"
            })
        } else {
            this.initState();
        }
    }

    initState() {
        this.setState({
            name        : "",
            nameState   : "",
            isOpened    : true,
            date        : "",
            dateState   : "",
            from        : "",
            fromState   : "",
            to          : "",
            toState     : ""
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
    }

    openHandler = name => event => {
        this.setState({ 
            [name]: event.target.checked,
        });
    };

    changeForm(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "name":
                this.setState({
                    name: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "date":
                if(!moment(event._d).isSame(moment())) {
                    this.setState({ date: moment(event._d), dateState: "success" });
                } else {
                    this.setState({ date: "", dateState: "error" });
                }
                break;
            case "from":
                let from = this.state.from;
                this.setState({
                    from: moment(event._d).format("HH:mm")
                })
                if(this.state.from == from) {
                    this.setState({ [stateName + "State"]: "error" });
                } else {
                    this.setState({ [stateName + "State"]: "success" });
                }
                break;
            case "to":
                let to = this.state.to;
                this.setState({
                    to: moment(event._d).format("HH:mm")
                })
                if(this.state.to == to) {
                    this.setState({ [stateName + "State"]: "error" });
                } else {
                    this.setState({ [stateName + "State"]: "success" });
                }
                break;
            default:
                break;
        }
    }

    canSave() {
        if((this.state.nameState === "success" && this.state.dateState === "success" && this.state.fromState === "success" && this.state.toState === "success") || (this.state.nameState === "success" && this.state.dateState === "success")) {
            return true;
        } else if(this.props.data) {
            return true;
        } else {
            return true;
        }
    }

    save = (isNew) => {
        if(isNew) {
            this.props.addSalonSpecialDay({
                workingForId: this.props.workingForId,
                specialDayData: {
                    name: this.state.name,
                    date: this.state.date,
                    openAt: this.state.from.replace(":", ""),
                    closeAt: this.state.to.replace(":", "")
                }
            })
        } else {            
            this.props.updateSalonSpecialDay({
                workingForId: this.props.workingForId,
                specialDayId: this.props.data.id,
                specialDayData: {
                    name: this.state.name,
                    date: moment(this.state.date).format("YYYY-MM-DD"),
                    open: this.state.isOpened,
                    openAt: this.state.from.replace(":", ""),
                    closeAt: this.state.to.replace(":", "")
                }
            })
        }
        this.initState();
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
                aria-labelledby="opening-hours-add-update-modal-title"
                aria-describedby="opening-hours-add-update-modal-description"
                >
                <DialogTitle
                    id="opening-hours-add-update-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>{this.props.modalTitle}</h3>
                </DialogTitle>
                <DialogContent
                    id="opening-hours-add-update-modal-description"
                    className={classes.modalBody}
                >
                    <form> 
                        <CustomInput
                            success={this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText="Namn *"
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                endAdornment:
                                    this.state.nameState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.changeForm(event, "name", "name", 0),
                                type: "text",
                                value: this.state.name
                            }}
                        /> 
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.isOpened}
                                    onChange={this.openHandler('isOpened')}
                                    classes={{
                                        switchBase: classes.switchBase,
                                        checked: classes.switchChecked,
                                        icon: classes.switchIcon,
                                        iconChecked: classes.switchIconChecked,
                                        bar: classes.switchBar
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Salon opened?"
                        />                        
                        <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                            <Datetime
                                timeFormat={false}
                                dateFormat={"DD/MM/YYYY"}
                                inputProps={{ placeholder: "Datum *" }}
                                value={this.state.date}
                                onChange={event => this.changeForm(event, "date", "date")}
                            />
                        </FormControl>     
                        {
                            this.state.isOpened? (
                                <GridContainer style={{paddingTop: '27px', marginBottom: '17px',}}>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl fullWidth>
                                            <Datetime
                                                dateFormat={false}
                                                timeFormat={"HH:mm"}
                                                inputProps={{ placeholder: "Från *" }}
                                                value={this.state.from}
                                                onChange={event => this.changeForm(event, "from", "from")}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl fullWidth>
                                            <Datetime
                                                dateFormat={false}
                                                timeFormat={"HH:mm"}
                                                inputProps={{ placeholder: "Till *" }}
                                                value={this.state.to}
                                                onChange={event => this.changeForm(event, "to", "to")}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>
                            ) : undefined
                        }               
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
                        onClick={() => this.save(this.props.data? false : true)}
                        color="info"
                        size="sm"
                        disabled={!this.canSave()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddUpdate.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.auth.workingForId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addSalonSpecialDay      : Actions.addSalonSpecialDay,
        updateSalonSpecialDay   : Actions.updateSalonSpecialDay
    }, dispatch);
}

export default withStyles(modalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddUpdate)));
