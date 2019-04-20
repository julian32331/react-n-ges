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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
            title: "",
            titleState: "",
            time: "",
            timeState: "",
            price: "",
            priceState: "",
            description: "",
            descriptionState: "",
            selectedEmployees: [],
        }
        setTimeout(() => {
            this.props.getEmployees({ workingForId: this.props.workingForId });            
        }, 1000);
        this.save = this.save.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('employees: ', nextProps.selectedEmployees)
        if(nextProps.data) {
            this.setState({
                title: nextProps.data.name,
                titleState: "success",
                time: nextProps.data.durationInMinutes,
                timeState: "success",
                price: nextProps.data.price,
                priceState: "success",
                description: nextProps.data.description,
                descriptionState: "success",
                selectedEmployees: nextProps.selectedEmployees             
            })
        } else {
            this.setState({
                title: "",
                titleState: "",
                time: "",
                timeState: "",
                price: "",
                priceState: "",
                description: "",
                descriptionState: "",
                selectedEmployees: []
            })
        }
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

    save(isNew) {
        if(isNew) {
            this.props.addSalonService({
                workingForId: this.props.workingForId,
                name: this.state.title,
                description: this.state.description,
                price: this.state.price,
                durationInMinutes: this.state.time
            })
        } else {            
            this.props.updateSalonService({
                workingForId: this.props.workingForId,
                id: this.props.data.id,
                serviceData: {
                    name: this.state.title,
                    description: this.state.description,
                    price: this.state.price,
                    durationInMinutes: this.state.time
                }        
            })
        }
        this.initState();
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "title":
            case "time":
            case "price":
            case "description":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "selectedEmployees":
                this.setState({
                    [stateName]: event.target.value
                })
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
                            labelText="Tjänstens namn *"
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
                                    this.change(event, "title", "title", 1),
                                type: "text",
                                value: this.state.title
                            }}
                        />
                        <GridContainer>
                            <GridItem xs={6}>
                                <CustomInput
                                    success={this.state.timeState === "success"}
                                    error={this.state.timeState === "error"}
                                    labelText="Tid (min) *"
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
                                            this.change(event, "time", "time", 1),
                                        type: "number",
                                        value: this.state.time
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={6}>
                                <CustomInput
                                    success={this.state.priceState === "success"}
                                    error={this.state.priceState === "error"}
                                    labelText="Pris (kr) *"
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
                                            this.change(event, "price", "price", 1),
                                        type: "number",
                                        value: this.state.price
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <CustomInput
                            success={this.state.descriptionState === "success"}
                            error={this.state.descriptionState === "error"}
                            labelText="Beskrivning *"
                            id="description"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 3,
                                endAdornment:
                                    this.state.descriptionState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.change(event, "description", "description", 1),
                                type: "text",
                                value: this.state.description
                            }}
                        />
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                        >
                            <InputLabel
                                htmlFor="multiple-select"
                                className={classes.selectLabel}
                            >
                                Assign to Employees
                            </InputLabel>
                            <Select
                                multiple
                                value={this.state.selectedEmployees}
                                onChange={(event) => this.change(event, "selectedEmployees", "selectedEmployees")}
                                MenuProps={{ className: classes.selectMenu }}
                                classes={{ select: classes.select }}
                                inputProps={{
                                    name: "selectedEmployees",
                                    id: "multiple-select"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    Assign to Employees
                                </MenuItem>
                                {
                                    this.props.employees.map((employee, key) => {
                                        return (
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                value={employee.employeeId}
                                                key={key}
                                            >
                                                {employee.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
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
        workingForId    : state.user.workingForId,
        employees       : state.employees.employees
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addSalonService : Actions.addSalonService,
        updateSalonService   : Actions.updateSalonService,
        getEmployees: Actions.getEmployees
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewOrUpdateModal)));
