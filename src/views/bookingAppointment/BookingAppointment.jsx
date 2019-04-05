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
import CircularProgress from '@material-ui/core/CircularProgress';

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
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";

import bookingAppointmentStyle from "assets/jss/material-dashboard-pro-react/views/bookingAppointment/bookingAppointmentStyle.jsx";
import CustomToolbar from "./CutomToolbar";

const localizer = BigCalendar.momentLocalizer(moment);

class BookingAppointment extends React.Component {
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
      this.getAppointment(this.state.initDate)
    }, 100);
  }

  getAppointment(date) {
    this.props.getAppointment({
      workingForId: this.props.workingForId,
      date: moment(date).format("YYYY-MM-DD")
    })
  }

  onChangeDate(date) {
    this.setState({ initDate: date });
    this.getAppointment(date)
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
    const { classes, loading } = this.props;

    const formats = {
      timeGutterFormat: "HH:mm",
      dayHeaderFormat: "YYYY-MM-DD"
    }

    const data = [];
    this.props.data.map(list => {
      let temp = {};
      temp.comment = list.comment;
      temp.consumerName = list.consumerName;
      temp.resourceId = list.hairdresser_id;
      temp.id = list.id;
      temp.plannedEndTime = moment(list.plannedEndTime).toDate();
      temp.plannedStartTime = moment(list.plannedStartTime).toDate();

      data.push(temp);
    });


    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12}>
              <Card classes={{card: classes.card}}>
                <CardHeader>            
                  <div className={classes.cardHeader}>
                      <h3 className={classes.cardTitle}>Booking Appointment</h3>
                  </div>
                </CardHeader>
                  <CardBody calendar>
                    {
                      loading? (
                        <div className={classes.loading_container}>
                          <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                        </div>
                      ) : 
                        <BigCalendar   
                          formats={formats}
                          localizer={localizer}
                          date={this.state.initDate}
                          step={15}
                          timeslots={4}
                          defaultView="day"
                          views={['day']}
                          components={
                            {
                              toolbar: CustomToolbar
                            }
                          }
                          resources={this.props.employees}
                          resourceIdAccessor="hairdresser_id"
                          resourceTitleAccessor="name"
                          events={data}
                          titleAccessor="consumerName"
                          startAccessor="plannedStartTime"
                          endAccessor="plannedEndTime"
                          onNavigate={(date) => this.onChangeDate(date)}
                          // onSelectEvent={event => this.selectedEvent(event)}
                          min={new Date(2019, 1, 0, 8, 0, 0)}
                        />
                    }
                  </CardBody>                
              </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workingForId: state.user.workingForId,
    loading     : state.booking_appointment.loading,
    data        : state.booking_appointment.data,
    employees   : state.booking_appointment.employees
  }
}
  
function mapDispatchToProps(dispatch) {
  return bindActionCreators({          
    getUserData     : Actions.getUserData,
    getAppointment  : Actions.getAppointment
  }, dispatch);
}
  
export default withStyles(bookingAppointmentStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingAppointment)));
