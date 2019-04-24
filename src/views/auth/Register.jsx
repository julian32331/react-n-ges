/**
 * Description: Register page
 * Date: 1/8/2019
 */

import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from '@material-ui/core/CircularProgress';

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

import * as Utils from 'utils';
import * as Validator from "validator";
import registerStyle from "assets/jss/material-dashboard-pro-react/views/auth/registerStyle.jsx";
import logo from "assets/img/logo.png";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgNo             : "",
      orgNoState        : "",
      isBack            : false,
      email             : "",
      emailState        : "",
      emailPerson       : "",
      emailPersonState  : "",
      phone             : "",
      phoneState        : "",
      loading           : false,
      alert             : false,
      message           : "",
      isSecond          : false,
      companyInfo       : null,
      director          : "",
      directorState     : "",
      isRegistered      : false
    }
    this.onKeyDown = this.onKeyDown.bind(this);
    this.next = this.next.bind(this);
    this.register = this.register.bind(this);
  }

  changeForm(event, stateName, type) {
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
        // TODO: Phone verification
        // if (Validator.verifyPhone(event.target.value)) {
        //   this.setState({ [stateName + "State"]: "success" });
        // } else if(Validator.verifyPhone(event.target.value) === "") {
        //   this.setState({ [stateName + "State"]: "" });
        // } else {
        //   this.setState({ [stateName + "State"]: "error" });
        // }
        break;
      case "email":
      case "emailPerson":
        this.setState({
          [stateName]: event.target.value
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
    if(this.state.orgNoState === "success" && this.state.emailState === "success") {
      return true
    } else {
      return false
    }
  }

  next(ev) {
    ev.preventDefault();
    this.setState({
      loading: true
    });
    Utils.xapi().post('register/company/firststep', {
      orgNo             : this.state.orgNo,
      email             : this.state.email,
      salesPersonEmail  : this.state.emailPerson,
      mobile            : this.state.phone,
      country           : "Sweden"
    }).then((response) => {
      this.setState({
        loading     : false,
        companyInfo : response.data,
        isSecond    : true
      })
    }).catch((error) => {
      this.setState({
        loading : false,
        alert   : true,
        message : JSON.parse(error.request.response).errorMessage
      });  
      setTimeout(() => {
        this.setState({
          alert   : false,
          message : ""
        })
      }, 3000);
    })
  }

  canRegister() {
    if(this.state.directorState === "success") {
      return true
    } else {
      return false
    }
  }

  register(ev) {
    ev.preventDefault();
    this.setState({
      loading: true
    });
    let name = this.state.companyInfo.directors.filter(director => director.SOCSECURITYNR === this.state.director);
    Utils.xapi().post('register/company/secondstep', {
      companyData: {
        orgNo                 : this.state.orgNo.replace("-", ""),
        email                 : this.state.email,
        salesPersonEmail      : this.state.emailPerson,
        mobile                : this.state.phone,
        country               : this.state.companyInfo.country,
        legalName             : this.state.companyInfo.legalName,
        addressCO             : this.state.companyInfo.addressCO,
        address               : this.state.companyInfo.address,
        post                  : this.state.companyInfo.post,
        city                  : this.state.companyInfo.city,
        authorizedSignerName  : name[0].NAME,
        authorizedSignerSSN   : this.state.director,
        noAuthorizedSigner    : this.state.companyInfo.noAuthorizedSigner
      }
    }).then((response) => {
      this.setState({
        loading : false,
        isRegistered: true
      })
    }).catch((error) => {
      this.setState({
        loading : false,
        alert   : true,
        message : JSON.parse(error.request.response).errorMessage
      });  
      setTimeout(() => {
        this.setState({
          alert: false,
          message: ""
        })
      }, 3000);
    })
  }

  cancel() {
    this.setState({
      orgNo       : "",
      orgNoState  : "",
      email       : "",
      emailState  : "",
      phone       : "",
      phoneState  : "",
      isSecond    : false,
      companyInfo : null
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
                {
                  this.state.isRegistered? (
                    <div>
                      <h3>Klart!</h3>
                      <div>Nu har du fått ett sms och ett e-post som innehåller vårt medlemsavtal. avtalet signerar du med BankID och så fort det är undertecknat får du ett e-post med din personliga inloggning.</div>                      
                      <div>Varmt välkommen som medlem i Geselle!</div>                      
                      <div className={classes.center + " " + classes.pt_15}>
                        <Link className={classes.link} to="/login">Logga in</Link>
                      </div>
                    </div>
                  ) : (
                    <form className={classes.form} onSubmit={this.state.isSecond? this.register : this.next}>
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
                            this.state.orgNoState === "error" &&
                              <InputAdornment position="end">
                                <Warning className={classes.danger} />
                              </InputAdornment>,
                          type: "text",
                          placeholder: "Org.nr. *",
                          onChange: event =>
                            this.changeForm(event, "orgNo", "orgNo"),
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
                            this.state.phoneState === "error" &&
                              <InputAdornment position="end">
                                <Warning className={classes.danger} />
                              </InputAdornment>,
                          type: "text",
                          placeholder: "Mobil *",
                          onChange: event =>
                            this.changeForm(event, "phone", "phone"),
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
                            this.state.emailState === "error" &&
                              <InputAdornment position="end">
                                <Warning className={classes.danger} />
                              </InputAdornment>,
                          type: "email",
                          placeholder: "E-post *",
                          onChange: event =>
                            this.changeForm(event, "email", "email"),
                          value: this.state.email,
                          disabled: this.state.loading || this.state.isSecond
                        }}
                      />
                      <CustomInput
                        success={this.state.emailPersonState === "success"}
                        error={this.state.emailPersonState === "error"}
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
                            this.state.emailPersonState === "error" &&
                              <InputAdornment position="end">
                                <Warning className={classes.danger} />
                              </InputAdornment>,
                          type: "email",
                          placeholder: "E-post för säljare",
                          onChange: event =>
                            this.changeForm(event, "emailPerson", "emailPerson"),
                          value: this.state.emailPerson,
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
                                value: this.state.companyInfo.legalName
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
                                value: this.state.companyInfo.addressCO
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
                                value: this.state.companyInfo.address
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
                                value: this.state.companyInfo.post
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
                                value: this.state.companyInfo.city
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
                                value: this.state.companyInfo.country
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
                                  this.changeForm(event, "director", "director")}
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
                                  this.state.companyInfo.directors.map((director, index) => {
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
                              <Button type="submit" color="info" className={classes.w_100_p} disabled={!this.canRegister() || this.state.loading}>
                                Sign up
                              </Button>
                              <Button type="button" color="danger" className={classes.w_100_p} onClick={() => this.cancel()}>
                                Cancel
                              </Button>
                            </div>       
                          </div>
                        ) : (                   
                          <div className={classes.center + " " + classes.pt_15}>
                            <Button type="submit" color="info" className={classes.w_100_p} disabled={!this.canNext() || this.state.loading}>
                              Next
                            </Button>
                            <div className={classes.pt_15}>Already have an account?</div>
                            <Link className={classes.link} to="/login">Logga in</Link>
                          </div>
                        )
                      }
                    </form>
                  )
                }
              </CardBody>
              {
                this.state.loading &&                                    
                  <div className={classes.loading_container}>
                    <CircularProgress classes={{colorPrimary: classes.loading}} />
                  </div>
              }
              <Snackbar
                place="tc"
                color="info"
                icon={AddAlert}
                message={this.state.message}
                open={this.state.alert}
                closeNotification={() => this.setState({ alert: false, message: "" })}
                close
              />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerStyle)(Register);
