import React from "react";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

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

import avatar from "assets/img/faces/marc.jpg";
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
      position: "",
      positionState: "",
      profession: "",
      professionState: "",
      description: "",
      descriptionState: "",
      file: null,
      imagePreviewUrl: ""
    };
  }

  componentWillMount() {
    this.props.getUserData();
    setTimeout(() => {
      this.getProfileData(this.props.workingForId);
    }, 100);
  }
    
  getProfileData(id) {
      this.props.getProfileData({
          workingForId: id
      })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.workingForId !== nextProps.workingForId) {
      // this.getServices(nextProps.workingForId);
    }
    if(nextProps.data) {
      this.setState({
        name: nextProps.data.name,
        orgNo: nextProps.data.ss_number,
        email: nextProps.data.email,
        phone: nextProps.data.EmployeeInformation.mobile,
        position: nextProps.data.EmployeeInformation.position,
        profession: nextProps.data.EmployeeInformation.profession,
        description: nextProps.data.EmployeeInformation.description,
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
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleClick() {
    this.refs.fileInput.click();
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
                  <img src={this.state.imagePreviewUrl} style={{width: '130px', height: '130px'}} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.nameState === "success"}
                      error={this.state.nameState === "error"}
                      labelText="Legal Name *"
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
                      labelText="Org Number"
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
                        disabled: !this.state.isEdit,
                        onChange: event =>
                            this.change(event, "orgNo", "orgNo", 1),
                        value: this.state.orgNo,
                        type: "text"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.emailState === "success"}
                      error={this.state.emailState === "error"}
                      labelText="Email"
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
                      labelText="Phone"
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
                  <GridItem xs={12} sm={6} md={6}>
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
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      success={this.state.professionState === "success"}
                      error={this.state.professionState === "error"}
                      labelText="Profession"
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
                      labelText="About Me"
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
                <Button color="info" className={classes.updateProfileButton}>
                  Update Profile
                </Button>
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
    workingForId    : state.user.workingForId,
    data: state.profile.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserData: Actions.getUserData,
    getProfileData: Actions.getProfileData
  }, dispatch);
}

export default withStyles(profileStyles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile)));
