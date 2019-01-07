/**
 * Description: Dashboard view
 * Date: 12/21/2018
 * Author: Dnaijel
 */

import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import moment from 'moment'

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";

import checkInOutStyle from "assets/jss/material-dashboard-pro-react/views/checkInOut/checkInOutStyle.jsx";
import CheckInModal from "./CheckInModal";

class CheckInOut extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchFrom: "",
      searchTo: "",
      checkInModal: false
    }
    this.list = [];
    this.getCheckList = this.getCheckList.bind(this);
  }

  componentWillMount() {
      this.props.getUserData();
      setTimeout(() => {
          this.getCheckList();
      }, 100);
  }

  getCheckList() {
    this.props.getCheckList({
        workingForId: this.props.workingForId
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.list)
      this.list = nextProps.list;
  }

  searchHandler(name, event) {
    this.setState({ [name]: event.target.value });
    this.search(event.target.value.toLowerCase(), null, null);
  };

  timeHandler = name => event => {
    this.setState({ [name]: moment(event._d) });
    this.search(this.state.search.toLowerCase(), moment(event._d), null);
  }
  
  search(search, from, to) {
    let temp = [];

    temp = search? this.props.list.filter( item => {
      return item.Employee.name.toLowerCase().indexOf(search) !== -1
    }) : this.props.list;

    // temp = from? temp.filter( item => {
    //   return item.Employee.name.toLowerCase().indexOf(search) !== -1
    // }) : temp;

    this.list = temp;
  }

  onCloseCheckInModal() {
    this.setState({
      checkInModal: false
    })
  }

  onOpenCheckInModal() {
    this.setState({
      checkInModal: true,
    })
  }

  render() {
    const { classes } = this.props;

    const checkOutButton =
        <Button color="danger" className={classes.actionButton}>
          <Remove className={classes.icon} /> Check Out User
        </Button>

    let list = [];
    this.list.map(item => {
      let temp = [];
      temp.push(item.Employee.name);
      temp.push(item.Employee.employeeId);
      temp.push(moment(item.checkIn).format("MM/DD/YYYY, hh:mm"));
      temp.push(item.checkOut? moment(item.checkOut).format("MM/DD/YYYY, hh:mm") : null);
      item.checkOut? temp.push("") : temp.push(checkOutButton)

      list.push(temp);
    })

    return (
      <Card>
        <CardHeader className={classes.pb_0}>
          <div className={classes.cardHeader}>
            <GridContainer>
                <GridItem xs={12} sm={6}>
                  <h3 className={classes.cardTitle}>Check In/Out</h3>
                </GridItem>
                <GridItem xs={12} sm={6} className={classes.text_right}>
                    <Button 
                        color="info" 
                        size="sm"
                        onClick={() => this.onOpenCheckInModal()}
                    >                            
                        <Add /> Check In USER
                    </Button>
                </GridItem>
            </GridContainer>
          </div>
        </CardHeader>
        <CardBody className={classes.pt_0}>
          <GridContainer>
            <GridItem xs={3} sm={1} md={2} lg={1}>
              <FormLabel className={classes.labelHorizontal}>
                Search
              </FormLabel>
            </GridItem>
            <GridItem xs={9} sm={3} md={3} lg={2}>
              <CustomInput
                id="search"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "search",
                  onChange: event =>
                    this.searchHandler("search", event),
                  value: this.state.search  
                }}
              />
            </GridItem>
            {/* <GridItem xs={3} sm={1}>
              <FormLabel className={classes.labelHorizontal}>
                From
              </FormLabel>
            </GridItem>
            <GridItem xs={9} sm={2} md={2} lg={1}>
              <FormControl fullWidth className={classes.pt_20}>
                <Datetime
                  timeFormat={false}
                  value={this.state.searchFrom}
                  onChange={this.timeHandler("searchFrom")}
                />
              </FormControl>
            </GridItem>
            <GridItem xs={3} sm={1}>
              <FormLabel className={classes.labelHorizontal}>
                To
              </FormLabel>
            </GridItem>
            <GridItem xs={9} sm={2} md={2} lg={1}>
              <FormControl fullWidth className={classes.pt_20}>
                <Datetime
                  timeFormat={false}
                />
              </FormControl>
            </GridItem> */}
          </GridContainer>

          <Table
            tableHead={[
              "Name",
              "Employe number",
              "Checked In",
              "Checked Out",
              "Action"
            ]}
            tableData={
              list
            }
            customCellClasses={[
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
            ]}
            customClassesForCells={[0, 1, 2, 3, 4, 5]}
            customHeadCellClasses={[
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
            ]}
            customHeadClassesForCells={[0, 1, 2, 3, 4, 5]}
          />

          <CheckInModal 
            onOpen={this.state.checkInModal}
            onClose={this.onCloseCheckInModal.bind(this)} 
          />

        </CardBody>
      </Card>
    );
  }
}

CheckInOut.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
      token       : state.user.token,
      workingForId: state.user.workingForId,
      list        : state.checkInOut.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserData : Actions.getUserData,
    getCheckList: Actions.getCheckList
  }, dispatch);
}

export default withStyles(checkInOutStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckInOut)));
