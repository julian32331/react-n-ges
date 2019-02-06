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

import Loader from 'react-loader-spinner';

import dashboard from "assets/img/dashboard.jpg";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state ={ 
      selectModal: false,
      isLoading: true
    }
  }
  
  componentWillMount() {
    this.props.getUserData();
    setTimeout(() => {
      let workingFor = [];
      if(this.props.workingFor) {
        workingFor = JSON.parse(this.props.workingFor);
      }    
      if(!this.props.token) {
        this.props.history.push("/login");
      } else {
        if(!this.props.workingForId && workingFor.length > 1) {
          this.setState({
            selectModal: true
          })
        } else {
          this.props.updateWorkingForId({
            workingForId: Number(workingFor[0]['workingForId']),
            isEmployee: workingFor[0]['companyAuthLevel'] === "EMPLOYEE"? true : false
          });
        }
      }
      this.setState({
        isLoading: false
      })
    }, 100);
    
  }
  
  onCloseSelectModal() {
    this.setState({
      selectModal: false
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      {
        this.state.isLoading? (
          <div className={classes.spinner_container}>                    
            <Loader 
              type="Oval"
              color="#7da8ae"
              height="40"	
              width="40"
            />
          </div>
        ) : (
          <Card>
            <CardBody className={classes.cardContent}>
              <h2 className={classes.text_center}>Dashboard</h2>
              <p style={{width: '60%', margin: '0 auto', fontSize: '20px', lineHeight: '25px'}}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
              </p>
              <p style={{width: '60%', margin: '0 auto', fontSize: '20px', lineHeight: '25px', marginTop: '10px'}}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
              </p>
              <p style={{width: '60%', margin: '0 auto', fontSize: '20px', lineHeight: '25px', marginTop: '10px'}}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
              </p>
            </CardBody>

            <SelectModal
              onOpen={this.state.selectModal}
              onClose={this.onCloseSelectModal.bind(this)}
            />
          </Card> 
        )
      }    
      </div>       
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    token: state.user.token,
    workingForId: state.user.workingForId,
    workingFor: state.user.workingFor
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getUserData : Actions.getUserData,
      updateWorkingForId: Actions.updateWorkingForId
    }, dispatch);
}

export default withStyles(dashboardStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard)));
