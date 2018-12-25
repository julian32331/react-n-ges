import React from "react";
import PropTypes from "prop-types";

import {Link} from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";
import LocationCity from "@material-ui/icons/LocationCity";
import Phone from "@material-ui/icons/Phone";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import MailOutline from "@material-ui/icons/MailOutline";
import VpnKey from "@material-ui/icons/VpnKey";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle.jsx";

import logo from "assets/img/logo.png";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
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
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}
                        >
                          <MailOutline className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      placeholder: "Org Number"
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
                      placeholder: "Address"
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
                          <PictureInPicture className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      placeholder: "ZIP"
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
                          <Phone className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      placeholder: "Phone Number"
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
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      placeholder: "Email"
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
                          <VpnKey className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      placeholder: "Password"
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
                          <VpnKey className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      placeholder: "Confirm Password"
                    }}
                  />
                  <div className={classes.center + " " + classes.pt_15}>
                    <Button color="info" className={classes.w_100_p}>
                      Sign Up
                    </Button>   
                    <div className={classes.pt_15}>Already have an account?</div>
                    <Link className={classes.link} to="/login">Sign In</Link>
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
