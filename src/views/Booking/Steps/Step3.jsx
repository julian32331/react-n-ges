import React from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
import moment from "moment";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";

import stepStyle from "assets/jss/material-dashboard-pro-react/views/booking/stepStyle";
import * as Validator from "./../../../validator";

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameState: "",
      mobile: "",
      mobileState: "",
      date: "",
      dateState: "",
      time: "",
      timeState: ""
    };
  }

  sendState() {
    return this.state;
  }
  isValidated() {
    if(this.props.match.params.consumerId && this.state.dateState == "success" && this.state.time == "success") {
      return true;
    }
    if(!this.props.match.params.consumerId && this.state.nameState == "success" && this.state.mobileState == "success" && this.state.dateState == "success" && this.state.timeState == "success") {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {               
        case "name":                   
        case "mobile":        
            this.setState({ 
                [stateName]: event.target.value,
                [stateName + "State"]: Validator.verifyLength(event.target.value, stateNameEqualTo)? "success" : "error"
            });
            break;      
        default:
            break;
    }
  
  }
  changeDate(value) {
    var date = moment(value._d).format("YYYY-MM-DD");
    this.props.getHairdresserSchedule({
      salonId: 4,
      hairdresserId: this.props.hairdresserId,
      date: date
    })
    this.setState({
      date: date,
      dateState: "success"
    })
  }

  setTime(time) {
    if(this.state.time == time) {
      this.setState({
        time: "",
        timeState: "error"
      })
    } else {
      this.setState({
        time: time,
        timeState: "success"
      })
    }    
  }

  render() {
    const { classes } = this.props;
    let isOpened = (current) => {
      return this.props.salonClosingDays.some(item => {
        return item.dayId !== current.day()
      })
    }
    const consumerId = this.props.match.params.consumerId;
    
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>
              Please select date and time.
            </h4>
          </GridItem>
        </GridContainer>

        {
          !consumerId? (
            <GridContainer justify="center">
              <GridItem xs={12} sm={3}>
                <CustomInput
                  success={this.state.nameState === "success"}
                  error={this.state.nameState === "error"}
                  labelText="Namn *"
                  id="name"
                  formControlProps={{
                      fullWidth: true
                  }}
                  inputProps={{
                    endAdornment:
                      this.state.nameState === "error" ? (
                        <InputAdornment position="end">
                          <Warning className={classes.danger} />
                        </InputAdornment>
                      ) : (
                        undefined
                    ),
                    onChange: event =>
                        this.change(event, "name", "name", 1),
                    value: this.state.name,
                    type: "text"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={3}>
                <CustomInput
                  success={this.state.mobileState === "success"}
                  error={this.state.mobileState === "error"}
                  labelText="Mobil *"
                  id="mobile"
                  formControlProps={{
                      fullWidth: true
                  }}
                  inputProps={{
                    endAdornment:
                      this.state.mobileState === "error" ? (
                        <InputAdornment position="end">
                          <Warning className={classes.danger} />
                        </InputAdornment>
                      ) : (
                        undefined
                    ),
                    onChange: event =>
                        this.change(event, "mobile", "mobile", 1),
                    value: this.state.mobile,
                    type: "number"
                  }}
                />
              </GridItem>
            </GridContainer>
          ) : undefined
        }
        
        <GridContainer justify="center">
          <GridItem xs={12} sm={6}>
            <FormControl fullWidth>
              <Datetime
                dateFormat={"YYYY-MM-DD"}
                timeFormat={false}
                inputProps={{ placeholder: "Date Picker Here" }}
                isValidDate={isOpened}
                onChange={(value)=>this.changeDate(value)}
              />
            </FormControl>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={9}>
            <GridContainer>
              {
                this.props.hairdresserSchedule.map((item, key) => {
                  return (
                    <GridItem key={key} xs={12} sm={3} className={classes.center}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.setTime(item)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                            checked={item == this.state.time}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        // label={moment(item.plannedStartTime).format("HH:mm")}
                        label={item}
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
    hairdresserOffDays: state.booking.hairdresserOffDays,
    salonClosingDays: state.booking.salonClosingDays,
    hairdresserSchedule: state.booking.hairdresserSchedule,
    hairdresserId: state.booking.hairdresserId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({          
    getHairdresserSchedule : Actions.getHairdresserSchedule,
  }, dispatch);
}

Step3 = withStyles(stepStyle)(Step3);
Step3 = connect(mapStateToProps, mapDispatchToProps)(Step3);
Step3 = withRouter(Step3);

export default Step3;
