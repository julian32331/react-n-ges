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

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";

import * as Validator from "./../../../validator";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class NewOrUpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameState: "",
            isOpened: true,
            date: "",
            dateState: "",
            from: "",
            fromState: "",
            to: "",
            toState: ""
        }
        this.save = this.save.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            this.setState({
                name: nextProps.data.name,
                nameState: "success",
                date: moment(nextProps.data.date).format("DD/MM/YYYY"),
                dateState: "success",
                from: nextProps.data.openAt.substr(0,2) + ":" + nextProps.data.openAt.substr(2,2),
                fromState: "success",
                to: nextProps.data.closeAt.substr(0,2) + ":" + nextProps.data.closeAt.substr(2,2),
                toState: "success"
            })
        } else {
            this.setState({
                name: "",
                nameState: "",
                date: "",
                dateState: "",
                from: "",
                fromState: "",
                to: "",
                toState: ""
            })
        }
    }

    initState() {
        this.setState({
            name: "",
            nameState: "",
            date: "",
            dateState: "",
            from: "",
            fromState: "",
            to: "",
            toState: "",
            isOpened: true,
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

    save(isNew) {
        if(isNew) {
            this.props.addSpecialDay({
                workingForId: this.props.workingForId,
                specialDayData: {
                    name: this.state.name,
                    date: this.state.date,
                    openAt: this.state.from.replace(":", ""),
                    closeAt: this.state.to.replace(":", "")
                }
            })
        } else {            
            this.props.updateSpecialDay({
                workingForId: this.props.workingForId,
                specialDayData: {
                    id: this.props.data.id,
                    name: this.state.name,
                    openAt: this.state.from.replace(":", ""),
                    closeAt: this.state.to.replace(":", "")
                }        
            })
        }
        this.initState();
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
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
        if(this.state.nameState === "success" && this.state.dateState === "success" && this.state.fromState === "success" && this.state.toState === "success") {
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
                aria-labelledby="opening-hours-newOrUpdate-modal-title"
                aria-describedby="opening-hours-newOrUpdate-modal-description"
                >
                <DialogTitle
                    id="opening-hours-newOrUpdate-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>{this.props.modalTitle}</h3>
                </DialogTitle>
                <DialogContent
                    id="opening-hours-newOrUpdate-modal-description"
                    className={classes.modalBody}
                >
                    <form> 
                        <CustomInput
                            success={this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText="Name *"
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
                                    this.change(event, "name", "name", 0),
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
                                inputProps={{ placeholder: "Date *" }}
                                value={this.state.date}
                                onChange={event => this.change(event, "date", "date")}
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
                                                inputProps={{ placeholder: "From *" }}
                                                value={this.state.from}
                                                onChange={event => this.change(event, "from", "from")}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl fullWidth>
                                            <Datetime
                                                dateFormat={false}
                                                timeFormat={"HH:mm"}
                                                inputProps={{ placeholder: "To *" }}
                                                value={this.state.to}
                                                onChange={event => this.change(event, "to", "to")}
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
                        disabled={this.canSave()}
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
        updateSpecialDay   : Actions.updateSpecialDay
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewOrUpdateModal)));
