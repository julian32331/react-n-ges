import React from "react";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// react component used to create a calendar with events on it
import BigCalendar from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import bookingAppointmentStyle from "assets/jss/material-dashboard-pro-react/views/bookingAppointment/bookingAppointmentStyle.jsx";
import CustomToolbar from "./CutomToolbar";
import SetBreakModal from './modals/SetBreakModal';

const localizer = BigCalendar.momentLocalizer(moment);
const colors = [
  "green", "azure", "orange", "rose"
]

class BookingAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initDate      : moment().toDate(),
      setBreakModal : false,
      hairdresserId : "",
      start         : "",
      end           : ""
    };
    this.onChangeDate = this.onChangeDate.bind(this);
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

  eventColors(event) {
    let color_id = event.resourceId % 4;

    let backgroundColor = "event-" + colors[color_id];    
    if(event.bookingType === "BREAK" || event.bookingType === "OFF")
      backgroundColor = "event-red";

    return {
      className: backgroundColor
    };
  }
  
  // Setting break time
  onOpenSetBreakModal = ({resourceId, start, end}) => {
    // let user = this.props.employees.find((employee) => {
    //   return employee.hairdresser_id == resourceId
    // })
    // if(user.name === this.props.username) {
      this.setState({
        setBreakModal : true,
        hairdresserId : resourceId,
        start         : moment(start).format('YYYY-MM-DD HH:mm'),
        end           : moment(end).format('HH:mm')
      })
    // }
  }
  onOpenSetBreakModalWithoutId = () => {
    this.setState({
      setBreakModal : true,
      start         : moment().format('YYYY-MM-DD'),
      end           : ""
    })
  }
  onCloseSetBreakModal = () => {
    this.setState({
      setBreakModal: false,
      hairdresserId : "",
      start         : "",
      end           : ""
    })
  }

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
      temp.consumerName = list.consumerName + " - " + list.comment;
      temp.resourceId = list.hairdresser_id;
      temp.id = list.id;
      temp.plannedEndTime = moment(list.plannedEndTime).toDate();
      temp.plannedStartTime = moment(list.plannedStartTime).toDate();
      temp.bookingType = list.bookingType;

      data.push(temp);
    });


    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12}>
            <Card classes={{card: classes.card}}>            
              <CardHeader>   
                <div className={classes.cardHeader}>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <h3 className={classes.cardTitle}>Booking Appointment</h3>
                    </GridItem>
                    <GridItem xs={12} sm={6} className={classes.right}>
                      <Button 
                        color="info" 
                        size="sm"
                        onClick={() => this.onOpenSetBreakModalWithoutId()}
                      >                         
                        Set DayOff
                      </Button>
                    </GridItem>
                  </GridContainer>
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
                      step={30}
                      timeslots={4}
                      min={new Date(2019, 1, 0, 8, 0, 0)}
                      defaultView="day"
                      views={['day']}
                      components={
                        {
                          toolbar: CustomToolbar
                        }
                      }
                      eventPropGetter={this.eventColors}
                      resources={this.props.employees}
                      resourceIdAccessor="hairdresser_id"
                      resourceTitleAccessor="name"
                      events={data}
                      titleAccessor="consumerName"
                      startAccessor="plannedStartTime"
                      endAccessor="plannedEndTime"
                      onNavigate={(date) => this.onChangeDate(date)}
                      selectable
                      onSelectSlot={this.onOpenSetBreakModal}
                    />
                }              
              </CardBody>                
            </Card>
                        
            <SetBreakModal 
              onOpen={this.state.setBreakModal}
              onClose={this.onCloseSetBreakModal}
              data={{
                hairdresserId : this.state.hairdresserId,
                start         : this.state.start,
                end           : this.state.end
              }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workingForId: state.user.workingForId,
    username    : state.user.username,
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