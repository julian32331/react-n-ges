/**
 * Description: Check view
 * Date: 4/30/2019
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
import CircularProgress from '@material-ui/core/CircularProgress';

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
import Confirm from "components/Modals/Confirm.jsx";

import {CSVLink} from 'react-csv';

import checkStyle from "assets/jss/material-dashboard-pro-react/views/my_ledger/check/checkStyle.jsx";
import CheckIn from "./modals/CheckIn";
import MCheckIn from "./modals/MCheckIn";
import EditCheck from "./modals/EditCheck";

class Check extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search        : "",
      searchFrom    : "",
      searchTo      : "",
      showCheckIn   : false,
      showConfirm   : false,
      showMCheckIn  : false,
      showEditCheck : false,
      modalData     : null,
      pageOffset    : 0,
      activedPageNo : 1,
      alert         : false,
      message       : "",
    }
    this.list = [];
  }

  componentWillMount() {
    this.props.getUser().then(() => {
      this.props.getLedgerChecks({
        workingForId: this.props.workingForId
      });
      this.props.getEmployees({
        workingForId: this.props.workingForId
      });
    })
  }

  componentWillReceiveProps(nextProps){    
    if(this.props.workingForId !== nextProps.workingForId) {
      this.props.getLedgerChecks({
        workingForId: nextProps.workingForId
      });
      this.props.getEmployees({
        workingForId: nextProps.workingForId
      });
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

  // Search actions
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

  // Check in modal Actions
  onCloseCheckIn() {
    this.setState({
      showCheckIn: false
    })
  }
  onOpenCheckIn() {
    this.setState({
      showCheckIn: true,
    })
  }
  
  // Confirm modal Actions
  onCloseConfirm() {
    this.setState({
      showConfirm: false
    })
  }
  onOpenConfirm(data) {
    this.setState({
      showConfirm : true,            
      modalData   : data
    })
  }
  onConfirmDelete() {
    this.props.checkOut({
      workingForId: this.props.workingForId,
      personnelListId: this.state.modalData.personnelListId,
      source: "WEB"
    })
  }
  
  // Manual Check in modal Actions
  onCloseMCheckIn() {
    this.setState({
      showMCheckIn: false
    })
  }
  onOpenMCheckIn() {
    this.setState({
      showMCheckIn: true,
    })
  }

  // Edit Check in/out modal Actions
  onCloseEditCheck() {
    this.setState({
      showEditCheck: false
    })
  }
  onOpenEditCheck(data) {
    this.setState({
      showEditCheck: true,
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
    const { classes, loading } = this.props;
    const { activedPageNo } = this.state;

    const actionButtons = data => {
      return (        
        <div>
          <Button color="info" className={classes.actionButton} onClick={() => this.onOpenConfirm(data)}>
              <Remove className={classes.icon} /> Check Out
          </Button>                
          <Button color="danger" className={classes.actionButton} onClick={() => this.onOpenEditCheck(data)}>
              <Edit className={classes.icon} /> Edit
          </Button>
        </div> 
      )
    }  
    
    const editButton = data => {
      return (               
        <Button color="danger" className={classes.actionButton} onClick={() => this.onOpenEditCheck(data)}>
            <Edit className={classes.icon} /> Edit
        </Button>
      )
    }

    let list = [];
    this.list.map((item, index) => {
      let temp = [];
      if (index >= (activedPageNo - 1) * 10 && index < activedPageNo * 10) {
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
      }
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
      <Card classes={{card: loading? classes.card : classes.m_0}}>
      {
        loading &&
          <div className={classes.loading_container}>
            <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
          </div>
      }
      {
        !loading &&
          <div>
            <CardHeader className={classes.pb_0}>
              <div className={classes.cardHeader}>
                <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <h3 className={classes.cardTitle}>Checka in/ut</h3>
                    </GridItem>
                    <GridItem xs={12} sm={6} className={classes.right}>
                      <Button 
                          color="success" 
                          size="sm"
                          disabled={csvData.length<=1}
                          onClick={() => this.downloadCSV()}
                          className={classes.mr_8}
                      >                            
                          <ImportExport /> Exportera CSV
                      </Button>
                      <Button 
                          color="info" 
                          size="sm"
                          onClick={() => this.onOpenCheckIn()}
                          className={classes.mr_8}
                      >                            
                          <Add /> Checka in
                      </Button>
                      <Button 
                          color="info" 
                          size="sm"
                          onClick={() => this.onOpenMCheckIn()}
                      >                            
                          <Add /> Manuell incheckning
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
                    onClick={() => {
                        this.setState({
                          search: "",
                          searchFrom: "",
                          searchTo: ""
                        });
                        this.search(null, null, null)
                      }
                    }
                > Rensa filter
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

          <CheckIn 
            onOpen={this.state.showCheckIn}
            onClose={this.onCloseCheckIn.bind(this)} 
          />

          <MCheckIn 
            onOpen={this.state.showMCheckIn}
            onClose={this.onCloseMCheckIn.bind(this)} 
          />

          <Confirm
            onOpen={this.state.showConfirm}
            onClose={this.onCloseConfirm.bind(this)}
            onConfirm={this.onConfirmDelete.bind(this)}
          />

          <EditCheck 
            onOpen={this.state.showEditCheck}
            onClose={this.onCloseEditCheck.bind(this)}
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
          </div>
      }
      </Card>
    );
  }
}

Check.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
      workingForId: state.auth.workingForId,
      loading     : state.my_ledger.check.loading,
      list        : state.my_ledger.check.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser         : Actions.getUser,
    getLedgerChecks : Actions.getLedgerChecks,
    getEmployees    : Actions.getEmployees,    
    checkOut        : Actions.checkOut
  }, dispatch);
}

export default withStyles(checkStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Check)));
