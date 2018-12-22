/**
 * Descirption: Saloon Service
 * Date: 12/22/2018
 * Author: Danijel
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Add from "@material-ui/icons/Add";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import saloonServiceStyle from "assets/jss/material-dashboard-pro-react/views1/saloonServiceStyle.jsx";

class SaloonService extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader>            
            <div className={classes.cardHeader}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <h3 className={classes.cardTitle}>Saloon Service</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} className={classes.text_right}>
                        <Button color="info">                            
                            <Add /> ADD USER
                        </Button>
                    </GridItem>
                </GridContainer>
            </div>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem md={9}>
                <GridContainer justify="center">
                    <GridItem md={3}>
                        Name
                    </GridItem>
                    <GridItem md={7}>
                        Description
                    </GridItem>
                    <GridItem md={2}>
                        Button
                    </GridItem>
                </GridContainer>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

SaloonService.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(saloonServiceStyle)(SaloonService);
