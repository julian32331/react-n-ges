/**
 * Description: Register page
 * Date: 1/8/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {Link} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import Warning from "@material-ui/icons/Warning";
import Book from "@material-ui/icons/Book";
import Place from "@material-ui/icons/Place";
import Home from "@material-ui/icons/Home";
import Face from "@material-ui/icons/Face";
import LocationCity from "@material-ui/icons/LocationCity";
import AddAlert from "@material-ui/icons/AddAlert";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import Loader from 'react-loader-spinner';

import * as Validator from "./../../validator";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle.jsx";

import logo from "assets/img/logo.png";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgNo: "",
      orgNoState: "",
      email: "",
      emailState: "",
      phone: "",
      phoneState: "",
      director: "",
      directorState: "",
      loading: false,
      isBack: false,
      alert: false,
      isSecond: false,
      message: ""
    }
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false
    })
    if(nextProps.errorMsg) {
      if (!this.state.alert) {
        this.setState({
          alert: true,
          message: nextProps.errorMsg
        });
        setTimeout(() => {
          this.setState({
            alert: false
          })
        }, 3000);
      }
    }
    if(nextProps.companyData) {
      this.setState({
        isSecond: true
      })
    }
    if(nextProps.status) {
      console.log('focus')
      if (!this.state.alert) {
        this.setState({
          alert: true,
          message: "Please check your email. Then you can set your password."
        });
        setTimeout(() => {
          this.setState({
            alert: false
          })
        }, 3000);
      }
    }
  }

  change(event, stateName, type) {
    switch (type) {
      case "orgNo":
        if(this.state.orgNo.length === 5 && !this.state.isBack) {
          this.setState({
            orgNo: event.target.value + "-"
          })
        } else {
          this.setState({
            orgNo: event.target.value
          })
        }
        if (Validator.verifyOrgNo(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else if(Validator.verifyOrgNo(event.target.value) === "") {
          this.setState({ [stateName + "State"]: "" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "phone":
        if(this.state.phone.length === 0) {
          this.setState({
            phone: "+46" + event.target.value
          })
        } else {
          this.setState({
            phone: event.target.value
          })
        }
        // if (Validator.verifyPhone(event.target.value)) {
        //   this.setState({ [stateName + "State"]: "success" });
        // } else if(Validator.verifyPhone(event.target.value) === "") {
        //   this.setState({ [stateName + "State"]: "" });
        // } else {
        //   this.setState({ [stateName + "State"]: "error" });
        // }
        break;
      case "email":
        this.setState({
          email: event.target.value
        })
        if (Validator.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else if(Validator.verifyEmail(event.target.value) === "") {
          this.setState({ [stateName + "State"]: "" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
        
      case "director":
        this.setState({
          director: event.target.value
        })
        if (Validator.verifyLength("" + event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else if(Validator.verifyLength("" + event.target.value, 1) === "") {
          this.setState({ [stateName + "State"]: "" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
  }

  onKeyDown(e) {
    if(e.keyCode === 8) {
      this.setState({
        isBack: true
      })
    } else {
      this.setState({
        isBack: false
      })
    }
  }

  canNext() {
    // if(this.state.orgNoState === "success" && this.state.phoneState === "success" && this.state.emailState === "success") {
    if(this.state.orgNoState === "success" && this.state.emailState === "success") {
      return false
    } else {
      return true
    }
  }

  next() {
    this.setState({
      loading: true
    });
    this.props.getCompanyData({
      orgNo: this.state.orgNo,
      email: this.state.email,
      mobile: this.state.phone,
      country: "Sweden"
    })
  }

  canRegister() {
    // if(this.state.orgNoState === "success" && this.state.phoneState === "success" && this.state.emailState === "success" && this.state.directorState === "success") {
    if(this.state.orgNoState === "success" && this.state.emailState === "success" && this.state.directorState === "success") {
      return false
    } else {
      return true
    }
  }

  register() {
    this.setState({
      loading: false
    });
    let name = this.props.companyData.directors.filter(director => director.SOCSECURITYNR === this.state.director);
    this.props.register({
      companyData: {
        orgNo: this.state.orgNo.replace("-", ""),
        email: this.state.email,
        mobile: this.state.phone,
        country: this.props.companyData.country,
        legalName: this.props.companyData.legalName,
        addressCO: this.props.companyData.addressCO,
        address: this.props.companyData.address,
        post: this.props.companyData.post,
        city: this.props.companyData.city,
        authorizedSignerName: name[0].NAME,
        authorizedSignerSSN: this.state.director
      }
    })
  }

  cancel() {
    this.setState({
      orgNo: "",
      orgNoState: "",
      email: "",
      emailState: "",
      phone: "",
      phoneState: "",
      isSecond: false
    })
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={6} lg={5}>
            <Card className={classes.cardSignup}>
              <CardHeader className={classes.center}>
                <img src={logo} height={54} alt="logo" />
              </CardHeader>
              <CardBody className={classes.pb_0}>
                <form className={classes.form}>
                  <CustomInput
                    success={this.state.orgNoState === "success"}
                    error={this.state.orgNoState === "error"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}
                        >                          
                          <PictureInPicture className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      endAdornment:
                        this.state.orgNoState === "error" ? (
                          <InputAdornment position="end">
                            <Warning className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                      ),
                      type: "text",
                      placeholder: "Org Number *",
                      onChange: event =>
                        this.change(event, "orgNo", "orgNo"),
                      onKeyDown: this.onKeyDown,
                      value: this.state.orgNo,
                      disabled: this.state.loading || this.state.isSecond
                    }}
                  />
                  <CustomInput
                    success={this.state.phoneState === "success"}
                    error={this.state.phoneState === "error"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}
                        >
                          <Phone className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      endAdornment:
                        this.state.phoneState === "error" ? (
                          <InputAdornment position="end">
                            <Warning className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                      ),
                      type: "text",
                      placeholder: "Phone Number *",
                      onChange: event =>
                        this.change(event, "phone", "phone"),
                      value: this.state.phone,
                      disabled: this.state.loading || this.state.isSecond
                    }}
                  />
                  <CustomInput
                    success={this.state.emailState === "success"}
                    error={this.state.emailState === "error"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}
                        >
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      endAdornment:
                        this.state.emailState === "error" ? (
                          <InputAdornment position="end">
                            <Warning className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                      ),
                      type: "email",
                      placeholder: "Email *",
                      onChange: event =>
                        this.change(event, "email", "email"),
                      value: this.state.email,
                      disabled: this.state.loading || this.state.isSecond
                    }}
                  />               
                  {
                    this.state.isSecond? (
                      <div>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            type: "text",
                            placeholder: "Legal Name",
                            disabled: true,
                            value: this.props.companyData.legalName
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Home className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            type: "text",
                            placeholder: "Address Co",
                            disabled: true,
                            value: this.props.companyData.addressCO
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Home className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            type: "text",
                            placeholder: "Address",
                            disabled: true,
                            value: this.props.companyData.address
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Book className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            type: "text",
                            placeholder: "Post",
                            disabled: true,
                            value: this.props.companyData.post
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <LocationCity className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            type: "text",
                            placeholder: "City",
                            disabled: true,
                            value: this.props.companyData.city
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Place className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            type: "text",
                            placeholder: "Country",
                            disabled: true,
                            value: this.props.companyData.country
                          }}
                        />   
                        <FormControl
                            fullWidth
                          >
                          <InputLabel
                            htmlFor="director-select"
                            className={classes.selectLabel}
                          >
                            Choose Director
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.director}
                            onChange={event =>
                              this.change(event, "director", "director")}
                            inputProps={{
                              name: "directorSelect",
                              id: "director-select",
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Director
                            </MenuItem>
                            {
                              this.props.companyData.directors.map((director, index) => {
                                  return (
                                      <MenuItem
                                          classes={{
                                              root: classes.selectMenuItem,
                                              selected: classes.selectMenuItemSelected
                                          }}
                                          value={director.SOCSECURITYNR}
                                          key={index}
                                      >
                                          {director.NAME}
                                      </MenuItem>
                                  )
                              })
                            }   
                          </Select>
                        </FormControl>                              
                        <div className={classes.center + " " + classes.pt_15}>  
                          <Button color="info" className={classes.w_100_p} onClick={() => this.register()} disabled={this.state.directorState !== "success"}>
                            Sign up
                          </Button>
                          <Button color="danger" className={classes.w_100_p} onClick={() => this.cancel()}>
                            Cancel
                          </Button>
                        </div>       
                      </div>
                    ) : (                   
                      <div className={classes.center + " " + classes.pt_15}>
                        <Button color="info" className={classes.w_100_p} onClick={() => this.next()} disabled={this.canNext() || this.state.loading}>
                          Next
                        </Button>
                        <div className={classes.pt_15}>Already have an account?</div>
                        <Link className={classes.link} to="/login">Sign In</Link>
                      </div>
                    )
                  }
                </form>
                {
                  this.state.loading? (
                    <div className={classes.spinner_container}>                    
                      <Loader 
                        type="Oval"
                        color="#00acc1"
                        height="40"	
                        width="40"
                      />
                    </div> 
                  ) : undefined
                }
                <Snackbar
                  place="tc"
                  color="info"
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.alert}
                  closeNotification={() => this.setState({ alert: false })}
                  close
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    companyData: state.auth.companyData,
    errorMsg: state.auth.errorMsg,
    status: state.auth.status
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getCompanyData: Actions.getCompanyData,
      register: Actions.register
    }, dispatch);
}

export default withStyles(registerPageStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage)));
