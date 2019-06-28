/**
 * Description: Fogotpassword Page
 * Date: 12/24/2018
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
import Email from "@material-ui/icons/Email";
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
import forgotPasswordStyle from "assets/jss/material-dashboard-pro-react/views/auth/forgotPasswordStyle";
import logo from "assets/img/logo.png";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      email       : "",
      emailState  : "",
      loading     : false,
      alert       : false,
      message     : "",
    }
    this.submit = this.submit.bind(this);
  }

  changeForm(event, stateName, type) {
    switch (type) {
      case "email":
        console.log('focus')
        this.setState({
          email: event.target.value
        })
        if (Validator.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
  }

  canSubmit() {
    if(this.state.emailState === "success") {
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
    Utils.xapi().post('employee/forgotpassword', {
      email: this.state.email
    }).then(() => {
      this.setState({
        loading : false,
        alert   : true,
        message : "Please check your email."
      })
    }).catch((error) => {
      this.setState({
        loading : false,
        alert   : true,
        message : JSON.parse(error.request.response).errorMessage
      })
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
                      placeholder: "E-post*",
                      onChange: event =>
                        this.changeForm(event, "email", "email"),
                      value: this.state.email,
                      disabled: this.state.loading
                    }}
                  />
                  <div className={classes.center}>
                    <Button color="info" className={classes.w_100_p} disabled={!this.canSubmit() || this.state.loading} type="submit">
                      Skicka
                    </Button>   
                    <div className={classes.pt_15}>
                      <Link className={classes.link} to="/login">Logga in</Link>
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

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(forgotPasswordStyle)(ForgotPassword);
