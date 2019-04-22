/**
 * Description: Login Page
 * Date: 12/24/2018
 */

import React from "react";
import PropTypes from "prop-types";

import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import VpnKey from "@material-ui/icons/VpnKey";
import Warning from "@material-ui/icons/Warning";
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

import * as Validator from "validator";
import * as Utils from 'utils';
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import logo from "assets/img/logo.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      email         : "",
      emailState    : "",
      password      : "",
      passwordState : "",
      loading       : false,
      alert         : false,
      message       : ""
    }
    this.login = this.login.bind(this);
  }

  changeForm(event, stateName, type) {
    switch (type) {
      case "email":
        this.setState({
          email: event.target.value
        })
        if (Validator.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        this.setState({
          password: event.target.value
        })
        if (Validator.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
  }

  canLogin() {
    if(this.state.emailState === "success" && this.state.passwordState === "success") {
      return true
    } else {
      return false
    }
  }

  login(ev) {
    ev.preventDefault();
    this.setState({
      loading: true
    });
    Utils.xapi().post('employee/login', {
      email     : this.state.email,
      password  : this.state.password
    }).then((response) => {
      this.props.setUser(response.data);
      this.setState({
        loading: false
      });
      this.props.history.push("/dashboard");
    }).catch((error) => {
      this.setState({
        loading : false,
        alert   : true,
        message : JSON.parse(error.request.response).error
      });      
      setTimeout(() => {
        this.setState({
          alert   : false,
          message : ""
        })
      }, 3000);
    })  
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={6} lg={5}>
            <Card className={classes.cardSignin}>
              <CardHeader className={classes.center}>
                <img src={logo} height={54} alt="logo" />
              </CardHeader>
              <CardBody className={classes.pb_0}>
                <form className={classes.form} onSubmit={this.login}>
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
                      disabled: this.state.loading
                    }}
                  />
                  <CustomInput
                    success={this.state.passwordState === "success"}
                    error={this.state.passwordState === "error"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}
                        >
                          <VpnKey className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      endAdornment:
                        this.state.passwordState === "error" &&
                          <InputAdornment position="end">
                            <Warning className={classes.danger} />
                          </InputAdornment>,
                      type: "password",
                      placeholder: "Lösen *",
                      onChange: event =>
                        this.changeForm(event, "password", "password"),
                      value: this.state.password,
                      disabled: this.state.loading
                    }}
                  />
                  <div className={classes.right + " " + classes.pb_15}>
                    <Link className={classes.link} to="/forgotpassword">Glömt lösen?</Link>
                  </div>
                  <div className={classes.center}>
                    <Button color="info" className={classes.w_100_p} disabled={!this.canLogin() || this.state.loading} ref="login" type="submit">
                      Logga in
                    </Button>   
                    <div className={classes.pt_15}>Har du inget konto?</div>
                    <Link className={classes.link} to="/register">Skaffa konto</Link>
                  </div>
                </form>
                {
                  this.state.loading &&
                    <div className={classes.spinner_container}>                    
                      <Loader 
                        type="Oval"
                        color="#7da8ae"
                        height="40"	
                        width="40"
                      />
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
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: Actions.setUser
  }, dispatch);
}

export default withStyles(loginPageStyle)(connect(null, mapDispatchToProps)(Login));
