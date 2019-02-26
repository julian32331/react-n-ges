import React from "react";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// react component used to create a calendar with events on it
import BigCalendar from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Person from "@material-ui/icons/Person";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import NavigateNext from "@material-ui/icons/NavigateNext";
import Done from "@material-ui/icons/Done";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";

import adminStyle from "assets/jss/material-dashboard-pro-react/views/admin/adminStyle.jsx";
import CustomToolbar from "./CutomToolbar";

const localizer = BigCalendar.momentLocalizer(moment);

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initDate: moment().toDate()
    };
    this.onChangeDate = this.onChangeDate.bind(this);
    // this.hideAlert = this.hideAlert.bind(this);
  }

  componentDidMount() {
    this.props.getUserData();
    setTimeout(() => {
      this.getBookingList(this.state.initDate);
    }, 100);
  }

  getBookingList(date) {
    this.props.getBookingList({
      workingForId: this.props.workingForId,
      date: moment(date).format("YYYY-MM-DD")
    })
  }

  onChangeDate(date) {
    this.setState({ initDate: date });
    this.getBookingList(date)
  }

  // selectedEvent(event) {
  //   alert(event.title);
  // }
  // addNewEventAlert(slotInfo) {
  //   this.setState({
  //     alert: (
  //       <SweetAlert
  //         input
  //         showCancel
  //         style={{ display: "block", marginTop: "-100px" }}
  //         title="Input something"
  //         onConfirm={e => this.addNewEvent(e, slotInfo)}
  //         onCancel={() => this.hideAlert()}
  //         confirmBtnCssClass={
  //           this.props.classes.button + " " + this.props.classes.success
  //         }
  //         cancelBtnCssClass={
  //           this.props.classes.button + " " + this.props.classes.danger
  //         }
  //       />
  //     )
  //   });
  // }
  // addNewEvent(e, slotInfo) {
  //   var newEvents = this.state.events;
  //   newEvents.push({
  //     title: e,
  //     start: slotInfo.start,
  //     end: slotInfo.end,
  //     resourceId: 2
  //   });
  //   this.setState({
  //     alert: null,
  //     events: newEvents
  //   });
  // }
  // hideAlert() {
  //   this.setState({
  //     alert: null
  //   });
  // }
  // eventColors(event, start, end, isSelected) {
  //   var backgroundColor = "event-";
  //   event.color
  //     ? (backgroundColor = backgroundColor + event.color)
  //     : (backgroundColor = backgroundColor + "default");
  //   return {
  //     className: backgroundColor
  //   };
  // }

  render() {
    console.log('state event: ', this.state.events)

    // Calendar options
    const formats = {
      timeGutterFormat: "HH:mm",
      dayHeaderFormat: "YYYY-MM-DD"
    }

    const bookingData = [];
    this.props.bookingData.map(data => {
      let temp = {};
      temp.comment = data.comment;
      temp.consumerName = data.consumerName;
      temp.resourceId = data.hairdresser_id;
      temp.id = data.id;
      temp.plannedEndTime = moment(data.plannedEndTime).toDate();
      temp.plannedStartTime = moment(data.plannedStartTime).toDate();

      bookingData.push(temp);
    });
    console.log('bookingData: ', bookingData);


    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={9}>
            <Heading
              textAlign="center"
              title="Booking Appointment"
            />
            {
              this.props.hairdressers.length > 0? (
                <Card>
                  <CardBody calendar>
                    <BigCalendar   
                      formats={formats}
                      localizer={localizer}
                      date={this.state.initDate}
                      step={15}
                      defaultView="day"
                      views={['day']}
                      components={
                        {
                          toolbar: CustomToolbar
                        }
                      }
                      resources={this.props.hairdressers}
                      resourceIdAccessor="hairdresser_id"
                      resourceTitleAccessor="name"
                      events={bookingData}
                      titleAccessor="consumerName"
                      startAccessor="plannedStartTime"
                      endAccessor="plannedEndTime"
                      onNavigate={(date) => this.onChangeDate(date)}
                      // onSelectEvent={event => this.selectedEvent(event)}
                    />
                  </CardBody>
                </Card>
              ) : undefined
            }
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workingForId: state.user.workingForId,
    bookingData: state.admin.bookingData,
    hairdressers: state.admin.hairdressers
  }
}
  
function mapDispatchToProps(dispatch) {
  return bindActionCreators({          
    getUserData : Actions.getUserData,
    getBookingList: Actions.getBookingList
  }, dispatch);
}
  
  export default withStyles(adminStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin)));
