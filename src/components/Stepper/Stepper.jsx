import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import stepperStyle from "assets/jss/material-dashboard-pro-react/components/stepperStyle.jsx";

class Stepper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, active, number, title, sub } = this.props;
    const active_number = "active_" + number;
    const number_container = active? classes.container + " " + classes.number_container + " " + classes[active_number] : classes.container + " " + classes.number_container;
    const title_container = active? classes.container + " " + classes.title_container + " " + classes[active_number] : classes.container + " " + classes.title_container;
    return (
      <div className={classes.root}>
          <div className={number_container}>
              <div className={classes.number}>{number}</div>
          </div>
          <div className={title_container}>
              <div className={classes.title}>
                  <div className={classes.header}>
                    {title}
                  </div>
                  <div className={classes.sub_header}>
                    {sub}
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

Stepper.defaultProps = {
  active: false
};

Stepper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(stepperStyle)(Stepper);
