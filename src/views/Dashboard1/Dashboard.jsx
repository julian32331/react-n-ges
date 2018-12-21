/**
 * Description: Dashboard view
 * Date: 12/21/2018
 * Author: Dnaijel
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views1/dashboardStyle.jsx";

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader>            
          <div className={classes.cardHeader}>
              <h3 className={classes.cardTitle}>Dashboard</h3>
          </div>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem md={12}>
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
