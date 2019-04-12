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
import defaultAvatar from "assets/img/default-avatar.png";
import cert from "assets/img/cert.png";

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
            description: "",
            descriptionState: "",            
            avatar: null,
            isChangedAvatar: false,
            avatarPreviewUrl: "",
            license: null,
            licensePreviewUrl: cert,
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
                description: nextProps.data.EmployeeInformation.description,
                descriptionState: "success",       
                avatarPreviewUrl: nextProps.data.EmployeeInformation.picturePath? Utils.root + nextProps.data.EmployeeInformation.picturePath : defaultAvatar,
                licensePreviewUrl: nextProps.data.EmployeeInformation.licensePath? Utils.root + nextProps.data.EmployeeInformation.licensePath : cert
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
            description: "",
            descriptionState: "",            
            avatar: null,
            isChangedAvatar: false,
            avatarPreviewUrl: "",
            license: null,
            licensePreviewUrl: cert,
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
    
    handleAvatarChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            avatar: file,
            isChangedAvatar: true,
            avatarPreviewUrl: reader.result
          });
        };
        reader.readAsDataURL(file);
    }
    handleLicenseChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            license: file,
            isChangedAvatar: true,
            licensePreviewUrl: reader.result
          });
        };
        reader.readAsDataURL(file);
    }
    handleClick(name) {
        if(name=="avatar") {
            if(!this.props.employee) {
                this.refs.avatarInput.click();
            }
        } else {
            if(!this.props.employee) {
                this.refs.licenseInput.click();
            }
        }
        
    }

    canSave() {         
        if(this.state.nameState === "success" && this.state.emailState === "success" && this.state.phoneState === "success" && this.state.professionState === "success" && this.state.descriptionState === "success") {
            return false
        } else {
            return true
        }
    }

    save() {
        let payload = new FormData();
        payload.append('workingForId', this.props.workingForId);
        payload.append('avatar', this.state.avatar, 'avatar.png');
        payload.append('hasAvatarChanged', this.state.isChangedAvatar)
        payload.append('email', this.state.email);
        payload.append('name', this.state.name);
        payload.append('mobile', this.state.phone);
        payload.append('profession', this.state.profession);
        payload.append('description', this.state.description);
        payload.append('employeeId', this.props.data.EmployeeInformation.employee_id);
        payload.append('employeeInformationId', this.props.data.EmployeeInformation.id);
        payload.append('license', this.state.license, 'license.png');

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
                        <GridContainer alignItems="center">
                            <GridItem xs={6}>
                                <input type="file" hidden onChange={this.handleAvatarChange.bind(this)} ref="avatarInput" />
                                <a onClick={() => this.handleClick("avatar")}>
                                    <img src={this.state.avatarPreviewUrl} style={{width: '130px', height: '130px', minWidth: '130px', minHeight: '130px', borderRadius: '50%', border: 'solid 1px', padding: '4px', overflow: 'hidden'}} alt="..." />
                                </a>
                            </GridItem>
                            <GridItem xs={6}>
                                <input type="file" hidden onChange={this.handleLicenseChange.bind(this)} ref="licenseInput" />
                                <a onClick={() => this.handleClick("license")}>
                                    <img src={this.state.licensePreviewUrl} style={{width: '130px', height: '130px', minWidth: '130px', minHeight: '130px', borderRadius: '50%', border: 'solid 1px', padding: '4px', overflow: 'hidden'}} alt="..." />
                                </a>
                            </GridItem>
                        </GridContainer>                             
                        {/* <input type="file" hidden onChange={this.handleImageChange.bind(this)} ref="fileInput" />
                        <a onClick={() => this.handleClick()}>
                            <img src={this.state.imagePreviewUrl} style={{width: '130px', height: '130px', minWidth: '130px', minHeight: '130px', borderRadius: '50%'}} alt="..." />
                        </a>                            */}
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
