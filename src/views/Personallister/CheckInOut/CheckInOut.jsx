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
import ImportExport from "@material-ui/icons/ImportExport";
import AddAlert from "@material-ui/icons/AddAlert";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import {CSVLink} from 'react-csv';

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
      modalData: null,
      alert: false,
      message: ""
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

    if(nextProps.errorMsg) {
      if (!this.state.alert) {
        this.setState({
          alert: true,
          message: nextProps.errorMsg
        });
        setTimeout(() => {
          this.setState({
            alert: false
          })
        }, 3000);
      }
    }
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
      return item.name.toLowerCase().indexOf(search) !== -1
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

  downloadCSV() {
    this.csvLink.link.click()
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
      temp.push(item.name);
      temp.push(item.ss_number);
      temp.push(moment(item.checkIn).format("MM/DD/YYYY, hh:mm"));
      temp.push(item.checkOut? moment(item.checkOut).format("MM/DD/YYYY, hh:mm") : null);
      item.checkOut? temp.push("") : temp.push(checkOutButton(item))

      list.push(temp);
    });

    let csvData = [
      ["Name", "Employee Number", "CheckIn", "CheckOut"]
    ];
    this.list.map(item => {
      let temp = [];
      temp.push(item.name);
      temp.push(item.employeeId);
      temp.push(moment(item.checkIn).format("MM/DD/YYYY, hh:mm"));
      temp.push(item.checkOut? moment(item.checkOut).format("MM/DD/YYYY, hh:mm") : null);

      csvData.push(temp);
    });

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
                      color="success" 
                      size="sm"
                      disabled={csvData.length<=1}
                      onClick={() => this.downloadCSV()}
                  >                            
                      <ImportExport /> Export CSV
                  </Button>
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
                Search :
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
            <GridItem xs={3} sm={1} md={2} lg={1}>
              <FormLabel className={classes.labelHorizontal}>
                From :
              </FormLabel>
            </GridItem>
            <GridItem xs={9} sm={2}>
              <FormControl fullWidth className={classes.pt_22}>
                <Datetime
                  dateFormat={"YYYY-MM-DD"}
                  timeFormat={false}
                  value={this.state.searchFrom}
                  onChange={event => this.timeHandler("searchFrom", event)}
                />
              </FormControl>
            </GridItem>
            <GridItem xs={3} sm={1} md={2} lg={1}>
              <FormLabel className={classes.labelHorizontal}>
                To :
              </FormLabel>
            </GridItem>
            <GridItem xs={9} sm={2}>
              <FormControl fullWidth className={classes.pt_22}>
                <Datetime
                  dateFormat={"YYYY-MM-DD"}
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
              "Employee number",
              "Checked In",
              "Checked Out",
              "Action"
            ]}
            tableData={
              list
            }
            customCellClasses={[
              classes.center + " " + classes.td,
              classes.center + " " + classes.td,
              classes.center + " " + classes.td,
              classes.center + " " + classes.td,
              classes.center + " " + classes.td,
              classes.center + " " + classes.td,
            ]}
            customClassesForCells={[0, 1, 2, 3, 4, 5]}
            customHeadCellClasses={[
              classes.center + " " + classes.th,
              classes.center + " " + classes.th,
              classes.center + " " + classes.th,
              classes.center + " " + classes.th,
              classes.center + " " + classes.th,
              classes.center + " " + classes.th,
            ]}
            customHeadClassesForCells={[0, 1, 2, 3, 4, 5]}
          />

          <CSVLink
            data={csvData}
            filename={"Check_In_Out_" + moment().format("YYYY_MM_DD_HH_mm") + ".csv"}
            style={{display: 'none',}}
            ref={(r) => this.csvLink = r}
            target="_blank"/>

          <CheckInModal 
            onOpen={this.state.checkInModal}
            onClose={this.onCloseCheckInModal.bind(this)} 
          />

          <CheckOutModal 
            onOpen={this.state.checkOutModal}
            onClose={this.onCloseCheckOutModal.bind(this)}
            data={this.state.modalData? this.state.modalData.employeeId : null} 
          />

          
          <Snackbar
            place="tc"
            color="info"
            icon={AddAlert}
            message={this.state.message}
            open={this.state.alert}
            closeNotification={() => this.setState({ alert: false })}
            close
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
      list        : state.checkInOut.list,
      errorMsg    : state.checkInOut.errorMsg
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
