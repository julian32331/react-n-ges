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

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import VpnKey from "@material-ui/icons/VpnKey";
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import * as Validator from "validator";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";

import logo from "assets/img/logo.png";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      loginEmail: "test1@geselle.se",
      loginEmailState: "",
      loginPassword: "1234",
      loginPasswordState: "",
    }
    this.login = this.login.bind(this);
    // test3@geselle.se
    // 1234
  }

  change(event, stateName, type) {
    switch (type) {
      case "email":
        this.setState({
          loginEmail: event.target.value
        })
        if (Validator.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else if(Validator.verifyEmail(event.target.value) === "") {
          this.setState({ [stateName + "State"]: "" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        this.setState({
          loginPassword: event.target.value
        })
        if (Validator.verifyLength(event.target.value, 4)) {
          this.setState({ [stateName + "State"]: "success" });
        } else if (Validator.verifyLength(event.target.value) === "") {
          this.setState({ [stateName + "State"]: "" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
  }
  canLogin() {
    // if(this.state.loginEmailState === "" || this.state.loginEmailState === "error" || this.state.loginPasswordState === "" || this.state.loginPasswordState === "error") {
      // return true
    // } else {
      return false
    // }
  }

  login() {
    // this.setState({
    //   has_company_saloon: true
    // })
    this.props.login({
      email: this.state.loginEmail,
      password: this.state.loginPassword
    });
    setTimeout(() => {
      this.props.history.push("/dashboard");      
    }, 1000);
    
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
                <form className={classes.form}>
                  <CustomInput
                    success={this.state.loginEmailState === "success"}
                    error={this.state.loginEmailState === "error"}
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
                        this.state.loginEmailState === "error" ? (
                          <InputAdornment position="end">
                            <Warning className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                      ),
                      type: "email",
                      placeholder: "Email*",
                      onChange: event =>
                        this.change(event, "loginEmail", "email"),
                      value: this.state.loginEmail
                    }}
                  />
                  <CustomInput
                    success={this.state.loginPasswordState === "success"}
                    error={this.state.loginPasswordState === "error"}
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
                        this.state.loginPasswordState === "error" ? (
                          <InputAdornment position="end">
                            <Warning className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                      ),
                      type: "password",
                      placeholder: "Password*",
                      onChange: event =>
                        this.change(event, "loginPassword", "password"),
                      value: this.state.loginPassword
                    }}
                  />
                  <div className={classes.right + " " + classes.pb_15}>
                    <a href="" className={classes.link}>Forgot Password?</a>
                  </div>
                  <div className={classes.center}>
                    <Button color="info" className={classes.w_100_p} onClick={this.login} disabled={this.canLogin()}>
                      Log In
                    </Button>   
                    <div className={classes.pt_15}>Don't you have account?</div>
                    <Link className={classes.link} to="/register">Sign Up</Link>
                  </div>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      login: Actions.login
    }, dispatch);
}

export default withStyles(loginPageStyle)(withRouter(connect(null, mapDispatchToProps)(LoginPage)));
