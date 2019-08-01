/**
 * Description: Dashboard page
 * Date: 4/24/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";

import { FormattedMessage } from 'react-intl';

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboard/dashboardStyle.jsx";
import SelectSalon from "./modals/SelectSalon.jsx";
import locales from './homeLocales.json';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state ={ 
      showSelectSalon: false
    }
  }
  
  componentDidMount() {
    this.props.setLocales(locales)
    this.props.getUser().then(() => {
      if(!this.props.token) {
        this.props.history.push("/login");
      } else {
        let workingFor = this.props.workingFor? JSON.parse(this.props.workingFor) : [];
        if(!this.props.workingForId && workingFor.length > 1) {
          this.setState({
            showSelectSalon: true
          })
        } else {
          this.props.updateUser({
            workingForId  : Number(workingFor[0]['workingForId']),
            isEmployee    : workingFor[0]['companyAuthLevel'] === "EMPLOYEE"? true : false
          });
        }
        this.props.getDashboardCampaigns();
      }
    })
  }
  
  onCloseSelectSalon() {
    this.setState({
      showSelectSalon: false
    })
  }

  onClickImg = (link) => {
    window.open(link, '_blank')
  }

  render() {
    const { classes, loading, campaigns } = this.props;
    return (
      <Card classes={{card: loading? classes.card : classes.p10}}>
        {
          loading &&
            <div className={classes.loading_container}>
                <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
            </div>
        }
        <GridContainer className={classes.imgContainer}>
          {
            campaigns.length > 0 &&
              campaigns.map((campaign, key) => {
                if (campaign.better_featured_image)
                  return (                  
                    <GridItem xs={12} sm={6} md={4} className={classes.p5} key={key}>
                      <img src={campaign.better_featured_image.source_url} className={classes.dashImg} alt="..." onClick={() => this.onClickImg(campaign.link)}/>
                    </GridItem>
                  )
              })
          }
          <SelectSalon
              onOpen={this.state.showSelectSalon}
              onClose={this.onCloseSelectSalon.bind(this)}
            />
        </GridContainer>
      </Card>       
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    token         : state.auth.token,
    workingForId  : state.auth.workingForId,
    workingFor    : state.auth.workingFor,
    loading       : state.dashboard.loading,
    campaigns     : state.dashboard.campaigns
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser     : Actions.getUser,
    updateUser  : Actions.updateUser,
    setLocales  : Actions.setLocales,
    getDashboardCampaigns : Actions.getDashboardCampaigns
  }, dispatch);
}

export default withStyles(dashboardStyle)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
