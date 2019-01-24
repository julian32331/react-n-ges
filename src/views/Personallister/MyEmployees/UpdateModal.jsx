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
            isChangedAvatar: false,
            imagePreviewUrl: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            console.log('data: ', nextProps.data);
            this.setState({
                name: nextProps.data.name,
                nameState: "success",
                email: nextProps.data.email,
                emailState: "success",
                phone: nextProps.data.EmployeeInformation.mobile,
                phoneState: "success",
                profession: nextProps.data.EmployeeInformation.profession,
                professionState: "success",
                position: nextProps.data.EmployeeInformation.position,
                positionState: "success",
                description: nextProps.data.EmployeeInformation.description,
                descriptionState: "success",       
                imagePreviewUrl: Utils.root + nextProps.data.EmployeeInformation.picturePath
            })
        }        
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
            isChangedAvatar: false,
            imagePreviewUrl: ""
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
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            isChangedAvatar: true,
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
        if(this.state.nameState === "success" && this.state.emailState === "success" && this.state.phoneState === "success" && this.state.professionState === "success" && this.state.positionState === "success" && this.state.descriptionState === "success") {
            return false
        } else {
            return true
        }
    }

    save() {
        let payload = new FormData();
        payload.append('workingForId', this.props.workingForId);
        payload.append('avatar', this.state.file, 'avatar.png');
        payload.append('hasAvatarChanged', this.state.isChangedAvatar)
        payload.append('email', this.state.email);
        payload.append('name', this.state.name);
        payload.append('mobile', this.state.phone);
        payload.append('profession', this.state.profession);
        payload.append('position', this.state.position);
        payload.append('description', this.state.description);
        payload.append('employeeId', this.props.data.EmployeeInformation.employee_id);
        payload.append('employeeInformationId', this.props.data.EmployeeInformation.id);

        this.props.updateEmployee(payload, this.props.workingForId)
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
                        <CustomInput
                            success={this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText="Name *"
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: this.state.name,
                                type: "text",
                                onChange: event =>
                                    this.change(event, "name", "name", 1),
                            }}
                        />
                        <CustomInput
                            success={this.state.emailState === "success"}
                            error={this.state.emailState === "error"}
                            labelText="Email *"
                            id="email"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: this.state.email, 
                                type: "email",                                              
                                onChange: event =>
                                    this.change(event, "email", "email"),
                            }}
                        />
                        <CustomInput
                            success={this.state.phoneState === "success"}
                            error={this.state.phoneState === "error"}
                            labelText="Phone *"
                            id="phone"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: this.state.phone,
                                type: "number",                                                
                                onChange: event =>
                                    this.change(event, "phone", "phone", 1),
                            }}
                        />                              
                        <GridContainer>
                            <GridItem xs={12} sm={6}>
                                <CustomInput
                                    success={this.state.professionState === "success"}
                                    error={this.state.professionState === "error"}
                                    labelText="Profession *"
                                    id="profession"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: this.state.profession,
                                        type: "text",                                                
                                        onChange: event =>
                                            this.change(event, "profession", "profession", 1),
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6}>
                                <CustomInput
                                    success={this.state.positionState === "success"}
                                    error={this.state.positionState === "error"}
                                    labelText="Position *"
                                    id="position"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: this.state.position,
                                        type: "text",                                                
                                        onChange: event =>
                                            this.change(event, "position", "position", 1),
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
                                rows: 3,
                                value: this.state.description,
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateEmployee   : Actions.updateEmployee,
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewModal)));
