import React from "react";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
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

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";
import CustomToolbar from "./CutomToolbar";
import SetBreak from './modals/SetBreak';
import DetailedEvent from './modals/DetailedEvent';

const localizer = BigCalendar.momentLocalizer(moment);
const colors = [
  "green", "azure", "orange", "rose"
]

class BookingAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initDate          : moment().toDate(),
      showSetBreak      : false,
      hairdresserId     : "",
      start             : "",
      end               : "",
      showDetailedEvent : false,
      detailedData      : null
    };
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  componentDidMount() {
    this.props.getUser().then(() => {
      this.getAppointment(this.state.initDate)
    })
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

  goBooking() {
    let salon = JSON.parse(this.props.workingFor).find(item => {
      return item.workingForId == this.props.workingForId;      
    });
    // TODO;
    // this.props.history.push('/booking/' + salon.Salon.id);
    this.props.history.push('/salonbooking/' + salon.Salon.id);
  }
  
  // Setting break time
  onOpenSetBreak = ({resourceId, start, end}) => {
    this.setState({
      showSetBreak  : true,
      hairdresserId : resourceId,
      start         : moment(start).format('YYYY-MM-DD HH:mm'),
      end           : moment(end).format('YYYY-MM-DD HH:mm')
    })
  }
  onOpenSetBreakWithoutId = () => {
    this.setState({
      showSetBreak  : true,
      start         : moment(this.state.initDate).format('YYYY-MM-DD'),
      end           : ""
    })
  }
  onCloseSetBreak = () => {
    this.setState({
      showSetBreak  : false,
      hairdresserId : "",
      start         : "",
      end           : ""
    })
  }

  onOpenDetailedEvent = (data) => {
    console.log('detailedData: ', data)
    this.setState({
      showDetailedEvent : true,
      detailedData      : data
    })
  }
  onCloseDetailedEvent = () => {
    this.setState({
      showDetailedEvent: false
    })
  }

  deleteEvent = () => {
    this.props.deleteBookingEvent({
      workingForId: this.props.workingForId,
      bookingId: this.state.detailedData.id
    });
  }

  render() {
    const { classes, loading } = this.props;

    const formats = {
      timeGutterFormat: "HH:mm",
      dayHeaderFormat: "YYYY-MM-DD",
      eventTimeRangeFormat: ({start, end}, culture, local) => local.format(start, "HH:mm", culture) + " - " + local.format(end, "HH:mm", culture)
    }

    const data = [];
    this.props.data.map(list => {
      let temp = {};
      temp.comment = list.comment;
      temp.consumerName = list.consumerName;
      temp.consumerEmail = list.consumerEmail;
      temp.consumerMobile = list.consumerMobile;
      temp.service = list.Service? list.Service.name : "";
      temp.employee = list.Employee? list.Employee.name : "";
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
            {
              loading &&
                <div className={classes.loading_container}>
                  <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                </div>
            }    
            {
              this.props.employees.length > 0 &&
                <div>
                  <CardHeader>   
                    <div className={classes.cardHeader}>
                      <GridContainer>
                        <GridItem xs={12} sm={6}>
                          <h3 className={classes.cardTitle}>Kalender</h3>
                        </GridItem>
                        <GridItem xs={12} sm={6} className={classes.right}>
                          <Button 
                            color="info" 
                            size="sm"
                            onClick={() => this.goBooking()}
                            className={classes.mr_8}
                          >                         
                            Boka tid
                          </Button>
                          <Button 
                            color="info" 
                            size="sm"
                            onClick={() => this.onOpenSetBreakWithoutId()}
                          >                         
                            Lägg in ledig dag 
                          </Button>
                        </GridItem>
                      </GridContainer>
                    </div>
                  </CardHeader>
                  <CardBody calendar>
                    <BigCalendar
                      formats={formats}
                      localizer={localizer}
                      date={this.state.initDate}
                      step={15}
                      timeslots={8}
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
                      titleAccessor={(event) => event.consumerName? event.consumerName : event.comment}
                      startAccessor="plannedStartTime"
                      endAccessor="plannedEndTime"
                      onNavigate={(date) => this.onChangeDate(date)}
                      selectable
                      onSelecting = {slot => console.log("slot: ", slot)}
                      onSelectSlot={this.onOpenSetBreak}
                      onSelectEvent={(event) => this.onOpenDetailedEvent(event)}
                    />             
                  </CardBody> 
                </div>
            }                     
            </Card>
                        
            <SetBreak 
              onOpen={this.state.showSetBreak}
              onClose={this.onCloseSetBreak}
              data={{
                hairdresserId : this.state.hairdresserId,
                start         : this.state.start,
                end           : this.state.end
              }}
            />

            <DetailedEvent 
              onOpen={this.state.showDetailedEvent}
              onClose={this.onCloseDetailedEvent}
              onDelete={this.deleteEvent}
              data={this.state.detailedData}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workingForId: state.auth.workingForId,
    workingFor  : state.auth.workingFor,
    username    : state.auth.username,
    loading     : state.booking_appointment.loading,
    data        : state.booking_appointment.data,
    employees   : state.booking_appointment.employees
  }
}
  
function mapDispatchToProps(dispatch) {
  return bindActionCreators({          
    getUser             : Actions.getUser,
    getAppointment      : Actions.getAppointment,
    deleteBookingEvent  : Actions.deleteBookingEvent
  }, dispatch);
}
  
export default withStyles(commonStyle)(connect(mapStateToProps, mapDispatchToProps)(BookingAppointment));
