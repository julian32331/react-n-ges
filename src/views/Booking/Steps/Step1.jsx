import React from "react";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

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

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: "",
      serviceState: "",
    };
  }

  sendState() {
    return this.state;
  }

  setService(id) {
    if(this.state.service == id) {
      this.setState({
        service: "",
        serviceState: "error"
      })
    } else {
      this.setState({
        service: id,
        serviceState: "success"
      })
    }    
  }

  isValidated() {
    if (this.state.serviceState == "success") {
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
              Please select service.
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={9}>
            <GridContainer>
              {
                this.props.services.map((service, key) => {
                  return (
                    <GridItem key={key} xs={12} sm={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.setService(service.id)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                            checked={service.id == this.state.service}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label={service.name}
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
    services: state.booking.services
  }
}

Step1 = withStyles(stepStyle)(Step1);
Step1 = connect(mapStateToProps)(Step1);

export default Step1;
  