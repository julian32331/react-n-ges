import React from "react";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

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
      hairdresser: "",
      hairdresserState: ""
    };
  }
  sendState() {
    return this.state;
  }

  setService(id) {
    if(this.state.hairdresser == id) {
      this.setState({
        hairdresser: "",
        hairdresserState: "error"
      })
    } else {
      this.setState({
        hairdresser: id,
        hairdresserState: "success"
      })
    }    
  }

  isValidated() {
    if (this.state.hairdresserState == "success") {
      return true;
    }         
    return false;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>
            Please select the services what you want.
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={9}>
            <GridContainer>
              {
                this.props.hairdressers.map((member, key) => {
                  return (
                    <GridItem key={key} xs={12} sm={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.setService(member.id)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                            checked={member.id == this.state.hairdresser}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label={member.name}
                      />           
                    </GridItem>
                  )
                })
              }
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hairdressers: state.booking.hairdressers
  }
}

Step2 = withStyles(stepStyle)(Step2);
Step2 = connect(mapStateToProps)(Step2);

export default Step2;
