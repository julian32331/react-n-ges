/**
 * Descirption: Update modal for my employee
 * Date: 12/23/2018
 */

import React from "react";
import PropTypes from "prop-types";

import FormData from "form-data";

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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Danger from "components/Typography/Danger.jsx";

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";
import avatar from "assets/img/faces/marc.jpg";

import * as Validator from "./../../../validator";
import * as Utils from 'utils';


function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class NewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameState: "",
            email: "",
            emailState: "",
            phone: "",
            phoneState: "",
            profession: "",
            professionState: "",
            position: "",
            positionState: "",
            description: "",
            descriptionState: "",            
            file: null,
            imagePreviewUrl: avatar
        }
    }

    componentWillReceiveProps(nextProps) {
        
    }

    initState() {
        this.setState({
            name: "",
            nameState: "",
            email: "",
            emailState: "",
            phone: "",
            phoneState: "",
            profession: "",
            professionState: "",
            position: "",
            positionState: "",
            description: "",
            descriptionState: "",            
            file: null,
            imagePreviewUrl: avatar
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "email":
                this.setState({ 
                    [stateName]: event.target.value,
                    [stateName + "State"]: Validator.verifyEmail(event.target.value)? "success" : "error"
                });
                break;                
            case "name":                  
            case "phone":            
            case "profession":            
            case "position":          
            case "description":
                this.setState({ 
                    [stateName]: event.target.value,
                    [stateName + "State"]: Validator.verifyLength(event.target.value, stateNameEqualTo)? "success" : "error"
                });
                break;      
            default:
                break;
        }
    }
    
    handleImageChange(e) {
        console.log('e: ', e.target.files[0].size);
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        };
        reader.readAsDataURL(file);
    }
    handleClick() {
        if(!this.props.employee) {
            this.refs.fileInput.click();
        }
    }

    canSave() {         
        if(this.state.file && this.state.nameState === "success" && this.state.ssnState === "success" && this.state.phoneState === "success" && this.state.professionState === "success" && this.state.positionState === "success" && this.state.descriptionState === "success" && this.state.consumerOwner && this.state.companyAuthLevel && this.state.salonAuthLevel && this.state.bookingPaymentFor && this.state.productPaymentFor) {
            return false
        } else {
            return true
        }
    }

    save() {
        console.log('focus')
        if(this.props.employee) {
            this.props.addExistEmployee({
                workingForId: this.props.workingForId,
                hairdresserId: this.props.employee.hairdresserId,
                hairdresserEmail: this.state.email,
                consumerOwner: this.state.consumerOwner,
                companyAuthLevel: this.state.companyAuthLevel,
                salonAuthLevel: this.state.salonAuthLevel,
                bookingPaymentFor: this.state.bookingPaymentFor,
                productPaymentFor: this.state.productPaymentFor
            })
        }
        this.handleClose();
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
                aria-labelledby="my-employee-newOrUpdate-modal-title"
                aria-describedby="my-employee-newOrUpdate-modal-description"
            >
                <DialogTitle
                    id="my-employee-newOrUpdate-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>{this.props.modalTitle}</h3>
                </DialogTitle>
                <DialogContent
                    id="my-employee-newOrUpdate-modal-description"
                    className={classes.modalBody}
                >
                    <form>                                  
                        <input type="file" hidden onChange={this.handleImageChange.bind(this)} ref="fileInput" />
                        <a onClick={() => this.handleClick()}>
                            <img src={this.state.imagePreviewUrl} style={{width: '130px', height: '130px', minWidth: '130px', minHeight: '130px', borderRadius: '50%'}} alt="..." />
                        </a>     
                        {
                            console.log('test: ', this.state.nameState)
                        }                         
                        <CustomInput
                            success={this.props.employee !== null || this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText="Name *"
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: this.props.employee? this.props.employee.name : this.state.name,
                                disabled: this.props.employee? true : false,
                                type: "text",
                                onChange: event =>
                                    this.change(event, "name", "name", 1),
                            }}
                        />
                        <CustomInput
                            success={this.props.employee? true : false}
                            labelText="Email *"
                            id="email"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: this.state.email,
                                disabled: true
                            }}
                        />
                        <CustomInput
                            success={this.props.employee !== null || this.state.phoneState === "success"}
                            error={this.state.phoneState === "error"}
                            labelText="Phone *"
                            id="phone"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: this.props.employee? this.props.employee.EmployeeInformation.mobile : this.state.phone,
                                disabled: this.props.employee? true : false,
                                type: "number",                                                
                                onChange: event =>
                                    this.change(event, "phone", "phone", 1),
                            }}
                        />                              
                        <GridContainer>
                            <GridItem xs={12} sm={6}>
                                <CustomInput
                                    success={this.props.employee !== null || this.state.professionState === "success"}
                                    error={this.state.professionState === "error"}
                                    labelText="Profession *"
                                    id="profession"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: this.props.employee? this.props.employee.EmployeeInformation.profession : this.state.profession,
                                        disabled: this.props.employee? true : false,
                                        type: "text",                                                
                                        onChange: event =>
                                            this.change(event, "profession", "profession", 1),
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6}>
                                <CustomInput
                                    success={this.props.employee !== null || this.state.positionState === "success"}
                                    error={this.state.positionState === "error"}
                                    labelText="Position *"
                                    id="position"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: this.props.employee? this.props.employee.EmployeeInformation.position : this.state.position,
                                        disabled: this.props.employee? true : false,
                                        type: "text",                                                
                                        onChange: event =>
                                            this.change(event, "position", "position", 1),
                                    }}
                                />
                            </GridItem>
                        </GridContainer> 
                        <CustomInput
                            success={this.props.employee !== null || this.state.descriptionState === "success"}
                            error={this.state.descriptionState === "error"}
                            labelText="Description *"
                            id="description"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 3,
                                value: this.props.employee? this.props.employee.EmployeeInformation.description : this.state.description,
                                disabled: this.props.employee? true : false,
                                type: "text",                                                
                                onChange: event =>
                                    this.change(event, "description", "description", 1),
                            }}
                        />                                                
                    </form>
                </DialogContent>                      
                    <DialogActions className={classes.modalFooter}>
                        <Button
                            onClick={() => this.handleClose()}
                            color="danger"
                            style={{width: '100%'}}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => this.save()}
                            color="info"
                            style={{width: '100%'}}
                            disabled={this.canSave()}
                        >
                            Save
                        </Button>
                    </DialogActions>      
            </Dialog>
        );
    }
}

NewModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId,
        employee        : state.employees.employee
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkEmployee    : Actions.checkEmployee,
        inviteEmployee   : Actions.inviteEmployee,
        addExistEmployee      : Actions.addExistEmployee,
        addNonExistEmployee   : Actions.addNonExistEmployee,
        updateEmployee   : Actions.updateEmployee,
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewModal)));
