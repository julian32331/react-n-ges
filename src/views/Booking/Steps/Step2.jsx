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
        <GridContainer justify="center">
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service1"
            />           
          </GridItem>
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service11"
            />           
          </GridItem>
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service111"
            />           
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service2"
            />           
          </GridItem>
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service22"
            />           
          </GridItem>
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service222"
            />           
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service3"
            />           
          </GridItem>
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service33"
            />           
          </GridItem>
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service333"
            />           
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service4"
            />           
          </GridItem>
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service44"
            />           
          </GridItem>
          <GridItem xs={9} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  //onClick={() => this.handleToggle(3)}
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
              label="Service444"
            />           
          </GridItem>
        </GridContainer>
      </GridContainer>
    );
  }
}

export default withStyles(stepStyle)(Step2);
