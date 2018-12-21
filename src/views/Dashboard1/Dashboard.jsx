import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
import Close from "@material-ui/icons/Close";
import Favorite from "@material-ui/icons/Favorite";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views1/dashboardStyle.jsx";

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardBody>
          <GridContainer>
            <GridItem md={12}>
              <div className={classes.cardHeader}>
                <h3 className={classes.cardTitle}>Dashboard</h3>
              </div>
              <div className={classes.cardContent}>
              </div>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
