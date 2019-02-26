import React from "react";
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
import { events, resourceMap } from "./general.jsx";
import CustomToolbar from "./CutomToolbar";

const localizer = BigCalendar.momentLocalizer(moment);

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
      resourceMap: resourceMap,
      alert: null,

      assignModal: false,
      bookingData: null,

      initDate: moment().toDate()
    };
    this.hideAlert = this.hideAlert.bind(this);
  }
  selectedEvent(event) {
    alert(event.title);
  }
  addNewEventAlert(slotInfo) {
    this.setState({
      alert: (
        <SweetAlert
          input
          showCancel
          style={{ display: "block", marginTop: "-100px" }}
          title="Input something"
          onConfirm={e => this.addNewEvent(e, slotInfo)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
        />
      )
    });
  }
  addNewEvent(e, slotInfo) {
    var newEvents = this.state.events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end,
      resourceId: 2
    });
    this.setState({
      alert: null,
      events: newEvents
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  eventColors(event, start, end, isSelected) {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  }

  onCloseAssignModal() {
    this.setState({
      assignModal: false
    })
  }
  onOpenAssignModal() {
    this.setState({
      assignModal: true,
    })
  }

  render() {
    const { classes } = this.props;

    // Calendar options
    const formats = {
      timeGutterFormat: "HH:mm"
    }

    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={9}>
            <Heading
              textAlign="center"
              title="Booking Appointment"
            />
            <Card>
              <CardBody calendar>
                <BigCalendar   
                  formats={formats}
                  localizer={localizer}
                  events={this.state.events}
                  defaultView="day"
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date()}
                  onSelectEvent={event => this.selectedEvent(event)}
                  eventPropGetter={this.eventColors}
                  step={15}
                  views={['day']}
                  resources={this.state.resourceMap}
                  resourceIdAccessor="resourceId"
                  resourceTitleAccessor="resourceTitle"
                  components={
                    {
                      toolbar: CustomToolbar
                    }
                  }
                  date={this.state.initDate}
                  onNavigate={(date) => this.setState({ initDate: date })}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(adminStyle)(Admin);
