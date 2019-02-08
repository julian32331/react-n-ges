import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// @material-ui/icons
import Check from "@material-ui/icons/Check";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import stepStyle from "assets/jss/material-dashboard-pro-react/views/booking/stepStyle";

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      desgin: false,
      code: false,
      develop: false
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Please select the services what you want.
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

export default withStyles(stepStyle)(Step2);
