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
import Place from "@material-ui/icons/Place";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import SelectModal from "./SelectModal.jsx";

import blog from "assets/img/blog.jpg";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state ={ 
      selectModal: false
    }
  }
  
  componentWillMount() {
    if(!localStorage.token) {
      this.props.history.push("/login");
    }
    if(!localStorage.workingForId) {
      this.setState({
        selectModal: true
      })
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
            <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>
                <CardHeader image className={classes.cardHeaderHover}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={blog} alt="..." />
                  </a>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardProductTitle}>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Velkommen til geselle
                    </a>
                  </h4>
                  <p className={classes.cardProductDesciprion}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
                  </p>
                </CardBody>
              </Card>
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
    workingForId: state.user.workingForId
  }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//       getUserData: Actions.getUserData
//     }, dispatch);
// }

export default withStyles(dashboardStyle)(withRouter(connect(mapStateToProps, null)(Dashboard)));
