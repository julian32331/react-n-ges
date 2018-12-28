/**
 * Description: Dashboard view
 * Date: 12/21/2018
 * Author: Dnaijel
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import SelectModal from "./SelectModal.jsx";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state ={ 
      selectModal: true
    }
  }
  
  onCloseSelectModal() {
    this.setState({
      selectModal: false
    })
  }

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

        <SelectModal
          onOpen={this.state.selectModal}
          onClose={this.onCloseSelectModal.bind(this)}
        />

      </Card>

    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

export default withStyles(dashboardStyle)(Dashboard);
