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
import Selector from "./modals/Selector";
import DirectBook from "./modals/DirectBook";

const localizer = BigCalendar.momentLocalizer(moment);
const colors = [
  "green", "azure", "orange", "rose"
]

class BookingAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCal           : false,
      calendarView      : "day",
      initDate          : moment().toDate(),
      resourceIds       : [],
      resources         : [],
      showSelector      : false,
      showSetBreak      : false,
      showDirectBook    : false,
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
      this.setState({
        resourceIds: [Number(this.props.hairdresserId)]
      })
      this.getAppointment(this.state.initDate)
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.employees.length > 0 && this.state.resources.length === 0 ) {
      let resources = []
      this.state.resourceIds.map(id => {
        let employee = nextProps.employees.find(employee => {
          return employee.hairdresser_id == id
        })
        resources.push(employee);
      }) 
      if (resources.length > 0) {
        this.setState({
          showCal: true
        })
      }
      this.setState({
        resources: resources
      })
    }
  }

  getAppointment(date, mode) {
    this.props.getAppointment({
      workingForId: this.props.workingForId,
      date: moment(date).format("YYYY-MM-DD"),
      viewMode: mode
    })
  }

  onChangeDate(date) {
    this.setState({ initDate: date });
    this.getAppointment(date, this.state.calendarView)
  }

  onView(view) {
    this.setState({calendarView: view});
    this.getAppointment(this.state.initDate, view)
  }

  eventColors(event) {
    let color = event.color? event.color.replace("#", "") : "";

    let backgroundColor = "event-" + color;    
    if(event.bookingType === "BREAK" || event.bookingType === "OFF" || color === "")
      backgroundColor = "event-red";

    return {
      className: backgroundColor
    };
  }

  goBooking() {
    let salon = JSON.parse(this.props.workingFor).find(item => {
      return item.workingForId == this.props.workingForId;      
    });
    window.open('/salonbooking/' + salon.Salon.id, '_blank')
  }

  onOpenSelector = ({resourceId, start, end}) => {
    this.setState({
      showSelector: true,
      hairdresserId : resourceId,
      start         : moment(start).format('YYYY-MM-DD HH:mm'),
      end           : moment(end).format('YYYY-MM-DD HH:mm')
    })
  }
  toBreak = () => {
    this.setState({
      showSelector: false,
      showSetBreak  : true,
    });
  }
  toBook = () => {
    this.setState({
      showSelector: false,
      showDirectBook: true
    });
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

  filter = (ids) => {
    let resources = []
    ids.map(id => {
      let employee = this.props.employees.find(employee => {
        return employee.hairdresser_id == id
      })
      resources.push(employee);
    })      
    this.setState({
      showCal: false,
      resourceIds: ids,
      resources: resources
    })
    setTimeout(() => {
      this.setState({
        showCal: true
      })
    }, 100);
  }

  render() {
    const { classes, loading } = this.props;

    const formats = {
      timeGutterFormat: "HH:mm",
      dayHeaderFormat: "YYYY-MM-DD",
      eventTimeRangeFormat: ({start, end}, culture, local) => local.format(start, "HH:mm", culture) + " - " + local.format(end, "HH:mm", culture)
    }

    let employeesObj = {};
    this.props.employees.map(employee => {
      employeesObj[employee.hairdresser_id] = employee.name
    })

    const data = [];
    this.props.data.map(list => {
      let temp = {};
      temp.comment = list.comment;
      temp.consumerName = list.consumerName;
      temp.consumerEmail = list.consumerEmail;
      temp.consumerMobile = list.consumerMobile;
      temp.service = list.Service? list.Service.name : "";
      temp.color = list.Service? list.Service.color : "#7da8ae"
      temp.employee = employeesObj[list.hairdresser_id];
      temp.resourceId = list.hairdresser_id;
      temp.id = list.id;
      temp.plannedEndTime = moment(list.plannedEndTime).toDate();
      temp.plannedStartTime = moment(list.plannedStartTime).toDate();
      temp.bookingType = list.bookingType;

      data.push(temp);
    });
    this.props.closedDays.map(day => {
      if (this.state.calendarView === "month") {
        let temp = {};
        temp.comment = "Salon is closed.";
        temp.consumerName = null;
        temp.consumerEmail = null;
        temp.consumerMobile = null;
        temp.service = null;
        temp.employee = employeesObj[this.state.resources[0].hairdresser_id];
        temp.resourceId = this.state.resources[0].hairdresser_id;
        temp.plannedStartTime = moment(day.date + " 00:00").toDate();
        temp.plannedEndTime = moment(day.date + " 23:59").toDate();
        temp.bookingType = "BREAK";

        data.push(temp);
      } else {
        this.state.resources.map(employee => {
          let temp = {};
          temp.comment = this.state.calendarView === "week" && this.state.resources.length > 1? "" : "Salon is closed.";
          temp.consumerName = null;
          temp.consumerEmail = null;
          temp.consumerMobile = null;
          temp.service = null;
          temp.employee = employeesObj[employee.hairdresser_id];
          temp.resourceId = employee.hairdresser_id;
          temp.plannedStartTime = moment(day.date + " 00:00").toDate();
          temp.plannedEndTime = moment(day.date + " 23:59").toDate();
          temp.bookingType = "BREAK";
  
          data.push(temp);
        })
      }
    })

    const toolbar = () => {
      let label;      
      if(this.state.calendarView === "day") {
        label = moment(this.state.initDate).format("YYYY-MM-DD")
      } else if(this.state.calendarView === "week") {
        label = moment(this.state.initDate).startOf("week").format("YYYY MMM DD") + " - " + moment(this.state.initDate).endOf("week").format("DD")
      } else {
        label = moment(this.state.initDate).format("YYYY MMM")
      }
      return <CustomToolbar
        employees={this.props.employees}
        resourceIds={this.state.resourceIds}
        filter={(ids) => this.filter(ids)} 
        date={this.state.initDate}
        view={this.state.calendarView}
        label={label}
        onNavigate={(val1, val2) => {
          if(val1 === "DATE") {
            this.onChangeDate(val2)
          } else if(val1 === "PREV") {
            var temp;
            if(this.state.calendarView === "day") {
              temp = moment(this.state.initDate).subtract(1, "day");
            } else if(this.state.calendarView === "week") {
              temp = moment(this.state.initDate).subtract(1, "week");
            } else {
              temp = moment(this.state.initDate).subtract(1, "month");
            }
            this.onChangeDate(temp.toDate())
          } else {
            var temp;
            if(this.state.calendarView === "day") {
              temp = moment(this.state.initDate).add(1, "day");
            } else if(this.state.calendarView === "week") {
              temp = moment(this.state.initDate).add(1, "week");
            } else {
              temp = moment(this.state.initDate).add(1, "month");
            }
            this.onChangeDate(temp.toDate())
          }
        }}
        onView={(view)=> this.onView(view)}
      />
    }

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
                    {
                      this.state.showCal && 
                        <BigCalendar
                          formats={formats}
                          localizer={localizer}
                          date={this.state.initDate}
                          step={15}
                          timeslots={8}
                          min={new Date(2019, 1, 0, 8, 0, 0)}
                          defaultView="day"
                          view={this.state.calendarView}
                          views={['month', 'week','day']}
                          components={
                            {
                              toolbar: toolbar
                            }
                          }
                          eventPropGetter={this.eventColors}
                          resources={this.state.resources}
                          resourceIdAccessor="hairdresser_id"
                          resourceTitleAccessor="name"
                          events={data}
                          titleAccessor={(event) => event.consumerName? event.consumerName : event.comment}
                          startAccessor="plannedStartTime"
                          endAccessor="plannedEndTime"
                          onNavigate={(date) => this.onChangeDate(date)}
                          selectable
                          onSelecting = {slot => console.log("slot: ", slot)}
                          onSelectSlot={this.onOpenSelector}
                          onSelectEvent={(event) => this.onOpenDetailedEvent(event)}
                          onView={() => {}}
                        />
                    }
                                   
                  </CardBody> 
                </div>
            }                     
            </Card>

            <Selector
              onOpen={this.state.showSelector}
              toBreak={this.toBreak}
              toBook={this.toBook}
              onClose={() => this.setState({ showSelector: false })}
            />
                        
            <SetBreak 
              onOpen={this.state.showSetBreak}
              onClose={this.onCloseSetBreak}
              data={{
                hairdresserId : this.state.hairdresserId,
                start         : this.state.start,
                end           : this.state.end
              }}
            />

            <DirectBook 
              onOpen={this.state.showDirectBook}
              hairdresssers={this.props.employees}
            />

            <DetailedEvent 
              onOpen={this.state.showDetailedEvent}
              onClose={this.onCloseDetailedEvent}
              onDelete={this.deleteEvent}
              data={this.state.detailedData}
              employees={this.props.employees}
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
    hairdresserId: state.auth.hairdresserId,
    workingFor  : state.auth.workingFor,
    username    : state.auth.username,
    loading     : state.booking_appointment.loading,
    // isSalonOpen : state.booking_appointment.isSalonOpen,
    closedDays  : state.booking_appointment.closedDays,
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
