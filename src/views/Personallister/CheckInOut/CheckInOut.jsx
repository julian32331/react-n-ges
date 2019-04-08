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
import Edit from "@material-ui/icons/Edit";

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
import Pagination from "components/Pagination/Pagination.jsx";

import {CSVLink} from 'react-csv';

import checkInOutStyle from "assets/jss/material-dashboard-pro-react/views/checkInOut/checkInOutStyle.jsx";
import CheckInModal from "./CheckInModal";
import MCheckInModal from "./MCheckInModal";
import CheckOutModal from "./CheckOutModal";
import EditModal from "./EditModal";

class CheckInOut extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchFrom: "",
      searchTo: "",
      checkInModal: false,
      checkOutModal: false,
      mCheckInModal: false,
      editModal: false,
      modalData: null,
      alert: false,
      message: "",
      pageOffset: 0,
      activedPageNo: 1,
    }
    this.list = [];
    this.getCheckList = this.getCheckList.bind(this);
  }

  componentWillMount() {
      this.props.getUserData();
      setTimeout(() => {
        this.getCheckList(this.props.workingForId);
        this.getEmployees(this.props.workingForId);
      }, 100);
  }

  getCheckList(id) {
    this.props.getCheckList({
        workingForId: id
    });

  }
  getEmployees(id) {
    this.props.getEmployees({
      workingForId: id
    })
  }

  componentWillReceiveProps(nextProps){    
    if(this.props.workingForId !== nextProps.workingForId) {
      this.getCheckList(nextProps.workingForId);
      this.getEmployees(nextProps.workingForId);
    }

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
  
  onCloseMCheckInModal() {
    this.setState({
      mCheckInModal: false
    })
  }
  onOpenMCheckInModal() {
    this.setState({
      mCheckInModal: true,
    })
  }

  onCloseEditModal() {
    this.setState({
      editModal: false
    })
  }
  onOpenEditModal(data) {
    this.setState({
      editModal: true,
      modalData: data
    })
  }

  downloadCSV() {
    this.csvLink.link.click()
  }  

  // Pagination actions
  changePagination(param) {
    let totalPages = this.list.length % 10 > 0 ? Math.floor(this.list.length / 10 + 1) : this.list.length / 10;
    if (param === 1) {
      if ((this.state.pageOffset + 1) * 5 < totalPages)
        this.setState(prevState => ({
          pageOffset: prevState.pageOffset + 1,
          activedPageNo: (prevState.pageOffset + 1) * 5 + 1
        }));
    } else {
      if (this.state.pageOffset - 1 >= 0)
        this.setState(prevState => ({
          pageOffset: prevState.pageOffset - 1,
          activedPageNo: (prevState.pageOffset - 1) * 5 + 5
        }));
    }
  }
  skipOne(param) {
    let totalPages = this.list.length % 10 > 0 ? Math.floor(this.list.length / 10 + 1) : this.list.length / 10;
    if (param === 1) {
      if (this.state.activedPageNo < totalPages) {
        if (this.state.activedPageNo + 1 > this.state.pageOffset * 5 + 5) {
          this.setState(prevState => ({
            pageOffset: prevState.pageOffset + 1,
            activedPageNo: prevState.activedPageNo + 1
          }));
        } else {
          this.setState(prevState => ({
            activedPageNo: prevState.activedPageNo + 1
          }));
        }
      }
    } else {
      if (this.state.activedPageNo - 1 > 0) {
        if (this.state.activedPageNo - 1 <= this.state.pageOffset * 5) {
          this.setState(prevState => ({
            pageOffset: prevState.pageOffset - 1,
            activedPageNo: prevState.activedPageNo - 1
          }));
        } else {
          this.setState(prevState => ({
            activedPageNo: prevState.activedPageNo - 1
          }));
        }
      }
    }
  }
  clickNumber(param) {
    console.log('params: ', param)
    this.setState({
      activedPageNo: param
    })
  }

  render() {
    const { classes } = this.props;

    const actionButtons = data => {
      return (
        // <Button color="danger" className={classes.actionButton} onClick={() => this.onOpenCheckOutModal(data)}>
        //   <Remove className={classes.icon} /> Check Out User
        // </Button>
        
        <div>
          <Button color="info" className={classes.actionButton} onClick={() => this.onOpenCheckOutModal(data)}>
              <Remove className={classes.icon} /> Check Out
          </Button>                
          <Button color="danger" className={classes.actionButton} onClick={() => this.onOpenEditModal(data)}>
              <Edit className={classes.icon} /> Edit
          </Button>
        </div> 
      )
    }  
    
    const editButton = data => {
      return (               
        <Button color="danger" className={classes.actionButton} onClick={() => this.onOpenEditModal(data)}>
            <Edit className={classes.icon} /> Edit
        </Button>
      )
    }

    let list = [];
    this.list.map(item => {
      let temp = [];
      if(item.checkInEditable || item.checkOutEditable || item.editComment) {
        temp.push("(Redigerad)")
      } else {
        temp.push("")
      }
      temp.push(item.name);
      temp.push(item.SSNumber);
      temp.push(moment(item.checkIn).format("YYYY-MM-DD HH:mm"));
      temp.push(item.checkOut? moment(item.checkOut).format("YYYY-MM-DD HH:mm") : null);
      item.canCheckOut? temp.push(actionButtons(item)) : temp.push(editButton(item))

      list.push(temp);
    });

    let csvData = [
      ["Namn", "Personnummer", "Incheckad", "Utcheckad", "CheckInEditable", "CheckOutEditable", "EditComment"]
    ];
    this.list.map(item => {
      let temp = [];
      temp.push(item.name);
      temp.push(item.employeeId);
      temp.push(moment(item.checkIn).format("YYYY-MM-DD HH:mm"));
      temp.push(item.checkOut? moment(item.checkOut).format("YYYY-MM-DD HH:mm") : "-");
      temp.push(item.checkInEditable? moment(item.checkInEditable).format("YYYY-MM-DD HH:mm") : "-");
      temp.push(item.checkOutEditable? moment(item.checkOutEditable).format("YYYY-MM-DD HH:mm") : "-");
      temp.push(item.editComment? item.editComment : "-");

      csvData.push(temp);
    });

    let pageNations = [];
    let totalPages = this.list.length % 10 > 0 ? Math.floor(this.list.length / 10 + 1) : this.list.length / 10;

    let temp = [];
    if (this.state.pageOffset !== 0) temp.push({ text: "<<", onClick: () => this.changePagination(-1) });

    if ((this.state.pageOffset + 1) * 5 < totalPages) {
      for (let i = 1; i <= 5; i++) {
        temp.push(
          { text: this.state.pageOffset * 5 + i, active: this.state.activedPageNo === this.state.pageOffset * 5 + i, onClick: () => this.clickNumber(this.state.pageOffset * 5 + i) },
        )
      }
    } else {
      for (let i = 1; i <= totalPages - this.state.pageOffset * 5; i++) {
        temp.push(
          { text: this.state.pageOffset * 5 + i, active: this.state.activedPageNo === this.state.pageOffset * 5 + i, onClick: () => this.clickNumber(this.state.pageOffset * 5 + i) },
        )
      }
    }

    if (this.state.pageOffset !== totalPages && totalPages > 5) temp.push({ text: ">>", onClick: () => this.changePagination(1) });

    if (totalPages > 0)
      pageNations = [
        { text: "PREV", onClick: () => this.skipOne(-1) },
        ...temp,
        { text: "NEXT", onClick: () => this.skipOne(1) }
      ]

    return (
      <Card>
        <CardHeader className={classes.pb_0}>
          <div className={classes.cardHeader}>
            <GridContainer>
                <GridItem xs={12} sm={6}>
                  <h3 className={classes.cardTitle}>Checka in/ut</h3>
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
                      <Add /> Check In
                  </Button>
                  <Button 
                      color="info" 
                      size="sm"
                      onClick={() => this.onOpenMCheckInModal()}
                  >                            
                      <Add /> Manual Check In
                  </Button>
                </GridItem>
            </GridContainer>
          </div>
        </CardHeader>
        <CardBody className={classes.pt_0}>
          <GridContainer>
            <GridItem xs={4} sm={1} md={2} lg={1}>
              <FormLabel className={classes.labelHorizontal}>
                Sök :
              </FormLabel>
            </GridItem>
            <GridItem xs={8} sm={3} md={3} lg={2}>
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
            <GridItem xs={4} sm={1} md={2} lg={1}>
              <FormLabel className={classes.labelHorizontal}>
                Från :
              </FormLabel>
            </GridItem>
            <GridItem xs={8} sm={2}>
              <FormControl fullWidth className={classes.pt_22}>
                <Datetime
                  dateFormat={"YYYY-MM-DD"}
                  timeFormat={false}
                  value={this.state.searchFrom}
                  onChange={event => this.timeHandler("searchFrom", event)}
                />
              </FormControl>
            </GridItem>
            <GridItem xs={4} sm={1} md={2} lg={1}>
              <FormLabel className={classes.labelHorizontal}>
                Till :
              </FormLabel>
            </GridItem>
            <GridItem xs={8} sm={2}>
              <FormControl fullWidth className={classes.pt_22}>
                <Datetime
                  dateFormat={"YYYY-MM-DD"}
                  timeFormat={false}
                  value={this.state.searchTo}
                  onChange={event => this.timeHandler("searchTo", event)}
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={1}>
              <div className={classes.pt_22}>
                <Button 
                    color="info" 
                    size="sm"
                    style={{width: '100%'}}
                    onClick={() => {
                        this.setState({
                          search: "",
                          searchFrom: "",
                          searchTo: ""
                        });
                        this.search(null, null, null)
                      }
                    }
                > Clear
                </Button>
              </div>
            </GridItem>
          </GridContainer>

          <Table
            tableHead={[
              "",
              "Namn",
              "Personnummer",
              "Incheckad",
              "Utcheckad",
              "Åtgärder"
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

          <GridContainer>
            <GridItem xs={12} sm={6}>
            </GridItem>
            <GridItem xs={12} sm={6} className={classes.right}>
              <Pagination
                pages={pageNations}
                color="info"
              />
            </GridItem>
          </GridContainer>

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

          <MCheckInModal 
            onOpen={this.state.mCheckInModal}
            onClose={this.onCloseMCheckInModal.bind(this)} 
          />

          <CheckOutModal 
            onOpen={this.state.checkOutModal}
            onClose={this.onCloseCheckOutModal.bind(this)}
            data={this.state.modalData? this.state.modalData.personnelListId : null} 
          />

          <EditModal 
            onOpen={this.state.editModal}
            onClose={this.onCloseEditModal.bind(this)}
            data={this.state.modalData} 
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
