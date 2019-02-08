import React from "react";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PictureUpload from "components/CustomUpload/PictureUpload.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import stepStyle from "assets/jss/material-dashboard-pro-react/views/booking/stepStyle";

// const style = {
//   infoText: {
//     fontWeight: "300",
//     margin: "10px 0 30px",
//     textAlign: "center"
//   },
//   inputAdornmentIcon: {
//     color: "#555"
//   },
//   inputAdornment: {
//     position: "relative"
//   }
// };

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      firstnameState: "",
      lastname: "",
      lastnameState: "",
      email: "",
      emailState: ""
    };
  }
  sendState() {
    return this.state;
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.firstnameState === "success" &&
      this.state.lastnameState === "success" &&
      this.state.emailState === "success"
    ) {
      return true;
    } else {
      if (this.state.firstnameState !== "success") {
        this.setState({ firstnameState: "error" });
      }
      if (this.state.lastnameState !== "success") {
        this.setState({ lastnameState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Please select salons.
          </h4>
        </GridItem>
        <GridItem xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                tabIndex={-1}
                onClick={() => this.handleToggle(3)}
                checkedIcon={
                  <Check className={classes.checkedIcon} />
                }
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="First Checkbox"
          />
          <FormControlLabel
            control={
              <Checkbox
                tabIndex={-1}
                onClick={() => this.handleToggle(3)}
                checkedIcon={
                  <Check className={classes.checkedIcon} />
                }
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="First Checkbox"
          />
        </GridItem>
        <GridItem xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                tabIndex={-1}
                onClick={() => this.handleToggle(3)}
                checkedIcon={
                  <Check className={classes.checkedIcon} />
                }
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="First Checkbox"
          />
          <FormControlLabel
            control={
              <Checkbox
                tabIndex={-1}
                onClick={() => this.handleToggle(3)}
                checkedIcon={
                  <Check className={classes.checkedIcon} />
                }
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="First Checkbox"
          />
        </GridItem>
        <GridItem xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                tabIndex={-1}
                onClick={() => this.handleToggle(3)}
                checkedIcon={
                  <Check className={classes.checkedIcon} />
                }
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="First Checkbox"
          />
          <FormControlLabel
            control={
              <Checkbox
                tabIndex={-1}
                onClick={() => this.handleToggle(3)}
                checkedIcon={
                  <Check className={classes.checkedIcon} />
                }
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="First Checkbox"
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(stepStyle)(Step1);
