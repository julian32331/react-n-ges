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
import CheckOutModal from "./CheckOutModal";

class CheckInOut extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchFrom: "",
      searchTo: "",
      checkInModal: false,
      checkOutModal: false,
      modalData: null
    }
    this.list = [];
    this.getCheckList = this.getCheckList.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
  }

  componentWillMount() {
      this.props.getUserData();
      setTimeout(() => {
          this.getCheckList();
          this.getEmployees();
      }, 100);
  }

  getCheckList() {
    this.props.getCheckList({
        workingForId: this.props.workingForId
    });

  }
  getEmployees() {
    this.props.getEmployees({
      workingForId: this.props.workingForId
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.list)
      this.list = nextProps.list;
  }

  searchHandler(name, event) {
    this.setState({ [name]: event.target.value });
    this.search(event.target.value.toLowerCase(), this.state.searchFrom, this.state.searchTo);
  };

  timeHandler(name, event) {
    if(!moment(event._d).isSame(moment())) {
      this.setState({ [name]: moment(event._d) });
      if(name === 'searchFrom') {
        this.search(this.state.search.toLowerCase(), moment(event._d), this.state.searchTo);
      } else {
        this.search(this.state.search.toLowerCase(), this.state.searchFrom,  moment(event._d));
      }
    } else {
      this.setState({ [name]: "" });
      if(name === 'searchFrom') {
        this.search(this.state.search.toLowerCase(), "", this.state.searchTo);
      } else {
        this.search(this.state.search.toLowerCase(), this.state.searchFrom,  "");
      }
    }
  }
  
  search(search, from, to) {
    let temp = [];

    temp = search? this.props.list.filter( item => {
      return item.Employee.name.toLowerCase().indexOf(search) !== -1
    }) : this.props.list;

    temp = from? temp.filter( item => {
      return moment(item.checkIn).isSameOrAfter(from);      
    }) : temp;

    temp = to? temp.filter( item => {
      return item.checkOut && moment(item.checkOut).isSameOrBefore(to);
    }) : temp;

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

  onCloseCheckOutModal() {
    this.setState({
      checkOutModal: false
    })
  }

  onOpenCheckOutModal(data) {
    this.setState({
      checkOutModal: true,
      modalData: data
    })
  }

  render() {
    const { classes } = this.props;

    const checkOutButton = data => {
      return (
        <Button color="danger" className={classes.actionButton} onClick={() => this.onOpenCheckOutModal(data)}>
          <Remove className={classes.icon} /> Check Out User
        </Button>
      )
    }        

    let list = [];
    this.list.map(item => {
      let temp = [];
      temp.push(item.Employee.name);
      temp.push(item.Employee.employeeId);
      temp.push(moment(item.checkIn).format("MM/DD/YYYY, hh:mm"));
      temp.push(item.checkOut? moment(item.checkOut).format("MM/DD/YYYY, hh:mm") : null);
      item.checkOut? temp.push("") : temp.push(checkOutButton(item))

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
            <GridItem>
              <FormLabel className={classes.labelHorizontal}>
                From
              </FormLabel>
            </GridItem>
            <GridItem md={1}>
              <FormControl fullWidth className={classes.pt_20}>
                <Datetime
                  timeFormat={false}
                  value={this.state.searchFrom}
                  onChange={event => this.timeHandler("searchFrom", event)}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormLabel className={classes.labelHorizontal}>
                To
              </FormLabel>
            </GridItem>
            <GridItem md={1}>
              <FormControl fullWidth className={classes.pt_20}>
                <Datetime
                  timeFormat={false}
                  value={this.state.searchTo}
                  onChange={event => this.timeHandler("searchTo", event)}
                />
              </FormControl>
            </GridItem>
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

          <CheckOutModal 
            onOpen={this.state.checkOutModal}
            onClose={this.onCloseCheckOutModal.bind(this)}
            data={this.state.modalData? this.state.modalData.Employee.employeeId : null} 
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
      workingForId: state.user.workingForId,
      list        : state.checkInOut.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserData : Actions.getUserData,
    getEmployees: Actions.getEmployees,
    getCheckList: Actions.getCheckList
  }, dispatch);
}

export default withStyles(checkInOutStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckInOut)));
