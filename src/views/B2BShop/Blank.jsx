/**
 * Description: Orders
 * Date: 2/7/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";

class Blank extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUser().then(() => {
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardBody>
          <h3 style={{textAlign: 'center', marginTop: '28vh'}}>Vi uppdaterar vår shop. Välkommen tillbaka snart.</h3>
        </CardBody>
      </Card>
    );
  }
}

Blank.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser : Actions.getUser
  }, dispatch);
}

export default withStyles(commonStyle)(connect(null, mapDispatchToProps)(Blank));

