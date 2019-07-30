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

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { FormattedMessage } from 'react-intl';

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboard/dashboardStyle.jsx";
import SelectSalon from "./modals/SelectSalon.jsx";
import locales from './homeLocales.json';

import image from "assets/img/Geselle One Mall 1 ppt.jpg";
import image1 from "assets/img/Geselle One Mall 2 ppt.jpg";
import image3 from "assets/img/Geselle One Mall 3 ppt.jpg";
import image4 from "assets/img/Geselle One Mall 4 ppt.jpg";
import image5 from "assets/img/Geselle One Mall 5 ppt.jpg";
import image6 from "assets/img/Geselle One Mall 6 ppt.jpg";

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
      }
    })
  }
  
  onCloseSelectSalon() {
    this.setState({
      showSelectSalon: false
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.p10}>
        <GridContainer className={classes.imgContainer}>
          <GridItem xs={12} sm={6} md={4} className={classes.p5}>
              <img src={image} className={classes.dashImg} alt="..." />
          </GridItem>
          <GridItem xs={12} sm={6} md={4} className={classes.p5}>
              <img src={image1} className={classes.dashImg} alt="..." />
          </GridItem>
          <GridItem xs={12} sm={6} md={4} className={classes.p5}>
              <img src={image3} className={classes.dashImg} alt="..." />
          </GridItem>
          <GridItem xs={12} sm={6} md={4} className={classes.p5}>
              <img src={image4} className={classes.dashImg} alt="..." />
          </GridItem>
          <GridItem xs={12} sm={6} md={4} className={classes.p5}>
              <img src={image5} className={classes.dashImg} alt="..." />
          </GridItem>
          <GridItem xs={12} sm={6} md={4} className={classes.p5}>
              <img src={image6} className={classes.dashImg} alt="..." />
          </GridItem>
          <SelectSalon
              onOpen={this.state.showSelectSalon}
              onClose={this.onCloseSelectSalon.bind(this)}
            />
        </GridContainer>
      </Card>
      // <Card className={classes.card}>
      //   <CardBody className={classes.cardContent}>
      //     <div className={classes.container}>
      //       <div className={classes.title}>
      //         <FormattedMessage id="title" defaultMessage="VARMT VÄLKOMMEN TILL GESELLE" />
      //       </div>
      //       <p className={classes.content}>
      //         Nordeuropas största frisörkedja för frisörer och salonger med frisörlicens & gesäll brev.
      //       </p>
      //       <p className={classes.content}>
      //         Vi ser fram emot att ta väl hand om dig, och att vi tillsammans skapar förutsättningarna för att återta kraften online och offline till alla våra medlemmar.
      //       </p>
      //       <p className={classes.content}>
      //         Geselle One är världens modernaste IT plattform för frisörer & salonger, och vår grundfilosofi är att det ska vara enkelt att driva salong och att lönsamheten till våra medlemmar är vårt fokus.
      //       </p>
      //       <p className={classes.content}>
      //         På Geselle One intranät kommer vi löpande gå ut med nyheter i världklass.
      //       </p>
      //     </div>
      //   </CardBody>

      //   <SelectSalon
      //     onOpen={this.state.showSelectSalon}
      //     onClose={this.onCloseSelectSalon.bind(this)}
      //   />
      // </Card>       
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
    workingFor    : state.auth.workingFor
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser     : Actions.getUser,
    updateUser  : Actions.updateUser,
    setLocales  : Actions.setLocales
  }, dispatch);
}

export default withStyles(dashboardStyle)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
