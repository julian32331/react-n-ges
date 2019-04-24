import React from "react";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import FormData from "form-data";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";

import profileStyles from "assets/jss/material-dashboard-pro-react/views/profileStyles.jsx";
import defaultAvatar from "assets/img/default-avatar.png";

import avatar from "assets/img/faces/marc.jpg";
import * as Validator from "./../../validator";
import * as Utils from 'utils';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameState: "",
      orgNo: "",
      orgNoState: "",
      email: "",
      emailState: "",
      phone: "",
      phoneState: "",
      profession: "",
      professionState: "",
      description: "",
      descriptionState: "",
      file: null,
      imagePreviewUrl: "",
      isChangedAvatar: false,
      isEdit: false
    };
  }

  componentWillMount() {
    this.props.getUser().then(() => {
      this.getProfileData(this.props.workingForId);
    })
  }
    
  getProfileData(id) {
      this.props.getProfileData({
          workingForId: id
      })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.workingForId !== nextProps.workingForId) {
      this.getProfileData(nextProps.workingForId);
    }
    if(nextProps.data) {
      this.setState({
        name: nextProps.data.name,
        nameState: nextProps.data.name? "success" : "error",
        orgNo: nextProps.data.ss_number,
        orgNoState: nextProps.data.ss_number? "success" : "error",
        email: nextProps.data.email,
        emailState: nextProps.data.email? "success" : "error",
        phone: nextProps.data.EmployeeInformation.mobile,
        phoneState: nextProps.data.EmployeeInformation.mobile? "success" : "error",
        profession: nextProps.data.EmployeeInformation.profession,
        professionState: nextProps.data.EmployeeInformation.profession? "success" : "error",
        description: nextProps.data.EmployeeInformation.description,
        descriptionState: nextProps.data.EmployeeInformation.description? "success" : "error",
        imagePreviewUrl: Utils.root + nextProps.data.EmployeeInformation.picturePath
      })
    }
  }

  handleImageChange(e) {
    console.log('e: ', e);
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
    if(this.state.isEdit)
      this.refs.fileInput.click();
  }

  enableEdit() {
    this.setState({
      isEdit: true
    })
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
      file: null,
      isChangedAvatar: false,
      imagePreviewUrl: ""
    })
  }

  cancelEdit() {
    this.setState({
      name: this.props.data.name,
      nameState: this.props.data.name? "success" : "error",
      orgNo: this.props.data.ss_number,
      orgNoState: this.props.data.ss_number? "success" : "error",
      email: this.props.data.email,
      emailState: this.props.data.email? "success" : "error",
      phone: this.props.data.EmployeeInformation.mobile,
      phoneState: this.props.data.EmployeeInformation.mobile? "success" : "error",
      profession: this.props.data.EmployeeInformation.profession,
      professionState: this.props.data.EmployeeInformation.profession? "success" : "error",
      description: this.props.data.EmployeeInformation.description,
      descriptionState: this.props.data.EmployeeInformation.description? "success" : "error",
      imagePreviewUrl: this.props.data.EmployeeInformation.picturePath? Utils.root + this.props.data.EmployeeInformation.picturePath : defaultAvatar, 
      isEdit: false
    })
  }

  canSubmit() {
    if(this.state.nameState === "success" 
      // && this.state.orgNoState === "success" 
      && this.state.emailState === "success" 
      && this.state.professionState === "success" 
      && this.state.descriptionState === "success") {
      return false;
    } else {
      return true
    }
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
        case "orgNo":                  
        case "phone":            
        case "profession":            
        // case "position":          
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
  save() {
    let payload = new FormData();
    payload.append('workingForId', this.props.workingForId);
    payload.append('avatar', this.state.file, 'avatar.png');
    payload.append('hasAvatarChanged', this.state.isChangedAvatar)
    payload.append('email', this.state.email);
    payload.append('name', this.state.name);
    // payload.append('name', this.state.name);
    payload.append('mobile', this.state.phone);
    payload.append('profession', this.state.profession);
    payload.append('description', this.state.description);
    payload.append('employeeId', this.props.data.employeeId);

    this.props.updateProfile(payload, this.props.workingForId)
    this.setState({
      isEdit: false
    })
  }

  render() {   
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              <CardAvatar profile>
                <input type="file" hidden onChange={this.handleImageChange.bind(this)} ref="fileInput" />
                <a onClick={() => this.handleClick()}>
                  <img src={this.state.imagePreviewUrl} style={{minWidth: '130px', minHeight: '130px', width: '130px', height: '130px'}} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.nameState === "success"}
                      error={this.state.nameState === "error"}
                      labelText="Namn *"
                      id="legal-name"
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
                        disabled: !this.state.isEdit,
                        onChange: event =>
                            this.change(event, "name", "name", 1),
                        value: this.state.name,
                        type: "text"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.orgNoState === "success"}
                      error={this.state.orgNoState === "error"}
                      labelText="Personnummer "
                      id="org-number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        endAdornment:
                          this.state.orgNoState === "error" ? (
                            <InputAdornment position="end">
                              <Warning className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                        ),
                        disabled: true,
                        onChange: event =>
                            this.change(event, "orgNo", "orgNo", 1),
                        value: this.state.orgNo,
                        type: "number"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.emailState === "success"}
                      error={this.state.emailState === "error"}
                      labelText="E-post"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        endAdornment:
                          this.state.emailState === "error" ? (
                            <InputAdornment position="end">
                              <Warning className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                        ),
                        disabled: !this.state.isEdit,
                        onChange: event =>
                            this.change(event, "email", "email", 1),
                        value: this.state.email,
                        type: "email"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.phoneState === "success"}
                      error={this.state.phoneState === "error"}
                      labelText="Telefonnummer *"
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        endAdornment:
                          this.state.phoneState === "error" ? (
                            <InputAdornment position="end">
                              <Warning className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                        ),
                        disabled: !this.state.isEdit,
                        onChange: event =>
                            this.change(event, "phone", "phone", 1),
                        value: this.state.phone,
                        type: "number"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {/* <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      success={this.state.positionState === "success"}
                      error={this.state.positionState === "error"}
                      labelText="Position"
                      id="position"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        endAdornment:
                          this.state.positionState === "error" ? (
                            <InputAdornment position="end">
                              <Warning className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                        ),
                        disabled: !this.state.isEdit,
                        onChange: event =>
                            this.change(event, "position", "position", 1),
                        value: this.state.position,
                        type: "text"
                      }}
                    />
                  </GridItem> */}
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      success={this.state.professionState === "success"}
                      error={this.state.professionState === "error"}
                      labelText="Yrke"
                      id="profession"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        endAdornment:
                          this.state.professionState === "error" ? (
                            <InputAdornment position="end">
                              <Warning className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                        ),
                        disabled: !this.state.isEdit,
                        onChange: event =>
                            this.change(event, "profession", "profession", 1),
                        value: this.state.profession,
                        type: "text"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      success={this.state.descriptionState === "success"}
                      error={this.state.descriptionState === "error"}
                      labelText="Om mig"
                      id="about-me"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                      inputProps={{
                        endAdornment:
                          this.state.descriptionState === "error" ? (
                            <InputAdornment position="end">
                              <Warning className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                        ),
                        disabled: !this.state.isEdit,
                        onChange: event =>
                            this.change(event, "description", "description", 1),
                        value: this.state.description,
                        type: "text"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                {
                  this.state.isEdit? (                      
                    <GridItem xs={12}>                    
                      <Button color="info" size="sm" className={classes.submit} disabled={this.canSubmit()} onClick={this.save.bind(this)}>Save</Button>
                      <Button color="danger" size="sm" className={classes.submit} onClick={this.cancelEdit.bind(this)}>Cancel</Button>
                    </GridItem>                                
                  ) : (
                    <GridItem xs={12}>                    
                      <Button color="info" size="sm" className={classes.submit} disabled={this.props.isEmployee === 'true'} onClick={this.enableEdit.bind(this)}>Edit</Button>
                    </GridItem> 
                  )
                } 
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }  
}

function mapStateToProps(state) {
  return {
    workingForId: state.auth.workingForId,
    isEmployee  : state.auth.isEmployee,
    data        : state.profile.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser       : Actions.getUser,
    getProfileData: Actions.getProfileData,
    updateProfile : Actions.updateProfile
  }, dispatch);
}

export default withStyles(profileStyles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile)));
