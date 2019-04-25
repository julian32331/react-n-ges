/**
 * Description: Reset password Page
 * Date: 12/24/2018
 */

import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
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

import * as Utils from 'utils/api';
import * as Validator from "utils/validator";
import resetPasswordStyle from "assets/jss/material-dashboard-pro-react/views/auth/resetPasswordStyle";
import logo from "assets/img/logo.png";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      password        : "",
      passwordState   : "",
      c_password      : "",
      c_passwordState : "",
      loading         : false,
      alert           : false,
      message         : ""
    }
    this.submit = this.submit.bind(this);
  }

  changeFormInput(event, stateName, type) {
    switch (type) {
      case "password":
        this.setState({
          password: event.target.value
        })
        if (Validator.verifyLength(event.target.value, 4)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "c_password":
        this.setState({
          c_password: event.target.value
        });
        if (Validator.compare(this.state.password, event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
      default:
        break;
    }
  }

  canSubmit() {
    if(this.state.passwordState === "success" && this.state.c_passwordState === "success") {
      return true
    } else {
      return false
    }
  }

  submit(ev) {
    ev.preventDefault();
    this.setState({
      loading: true
    });
    Utils.xapi().post('register/setpassword', {
      password: this.state.password,
      token: this.props.match.params.token
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
                <form className={classes.form} onSubmit={this.submit}>
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
                      placeholder: "Password*",
                      onChange: event =>
                        this.changeFormInput(event, "password", "password"),
                      value: this.state.password,
                      disabled: this.state.loading
                    }}
                  />
                  <CustomInput
                    success={this.state.c_passwordState === "success"}
                    error={this.state.c_passwordState === "error"}
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
                        this.state.c_passwordState === "error" &&
                          <InputAdornment position="end">
                            <Warning className={classes.danger} />
                          </InputAdornment>,
                      type: "password",
                      placeholder: "Confirm Password*",
                      onChange: event =>
                        this.changeFormInput(event, "c_password", "c_password"),
                      value: this.state.c_password,
                      disabled: this.state.loading
                    }}
                  />
                  <div className={classes.center}>
                    <Button color="info" className={classes.w_100_p} type="submit" disabled={!this.canSubmit() || this.state.loading}>
                      Send
                    </Button>   
                    <div className={classes.pt_15}>
                      <Link className={classes.link} to="/login">Sign In</Link>
                    </div>
                  </div>
                </form>
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

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: Actions.setUser      
  }, dispatch);
}

export default withStyles(resetPasswordStyle)(connect(null, mapDispatchToProps)(ResetPassword));
