import React from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
import moment from "moment";

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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// @material-ui/icons
import Check from "@material-ui/icons/Check";

import stepStyle from "assets/jss/material-dashboard-pro-react/views/booking/stepStyle";

class Step3 extends React.Component {
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
  isValidated() {
    return true;
  }

  changeDate(value) {
    var date = moment(value._d).format("YYYY-MM-DD");
    this.props.getHairdresserSchedule({
      salonId: 4,
      hairdresserId: this.props.hairdresserId,
      date: date
    })
  }
  render() {
    const { classes } = this.props;
    let isOpened = (current) => {
      return this.props.salonClosingDays.some(item => {
        return item.dayId !== current.day()
      })
    }
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>
              Please select date and time.
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={4}>
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
          <GridItem xs={12} sm={1}></GridItem>
          <GridItem xs={12} sm={4}>
            <GridContainer>
            {
              this.props.hairdresserSchedule.map((item, key) => {
                return (
                  <GridItem xs={12}>
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
                      label={moment(item.plannedStartTime).format("HH:mm")}
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

export default Step3;
