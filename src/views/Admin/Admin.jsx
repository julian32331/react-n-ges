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

import adminStyle from "assets/jss/material-dashboard-pro-react/views/adminStyle.jsx";
import { events, resourceMap } from "./general.jsx";
import AssignModal from "./AssignModal";

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

    // const appointButton = () => {
    //   return (  
    //     <Button
    //       simple
    //       color="info"
    //       className={classes.actionButton + " " + classes.actionButtonRound}
    //       // onClick={() => this.onOpenEditModal()}
    //     >
    //       <ArrowForwardIos className={classes.icon} />
    //     </Button>     
    //   )
    // }
    const appointButton = [
      { color: "info", icon: ArrowForwardIos },
    ].map((prop, key) => {
      return (
        <Button
          simple
          color={prop.color}
          className={classes.actionButton + " " + classes.actionButtonRound}
          onClick={() => this.onOpenAssignModal()}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });

    const watingList = [
      [
        "1",
        "Andrew Mike",
        "09:30 - 10:15",
        appointButton
      ],
      ["2", "John Doe", "09:30 - 10:15", appointButton],
      [
        "3",
        "Alex Mike",
        "09:30 - 10:15",
        appointButton
      ],
      [
        "4",
        "Mike Monday",
        "09:30 - 10:15",
        appointButton
      ],
      [
        "5",
        "Paul Dickens",
        "09:30 - 10:15",
        appointButton
      ]
    ]

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={9}>
            <Heading
              textAlign="center"
              title="Booking Appointment"
            />
            {/* {this.state.alert} */}
            <Card>
              <CardBody calendar>
                <BigCalendar   
                  formats={formats}
                  // selectable
                  localizer={localizer}
                  events={this.state.events}
                  defaultView="day"
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date()}
                  onSelectEvent={event => this.selectedEvent(event)}
                  // onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
                  eventPropGetter={this.eventColors}
                  step={15} // Time per grid
                  // timeslots={4}
                  views={['day']}
                  resources={this.state.resourceMap}
                  resourceIdAccessor="resourceId"
                  resourceTitleAccessor="resourceTitle"
                  // min={new Date(2019, 1, 0, 8, 0, 0)}
                  // max={new Date(2019, 1, 0, 18, 0, 0)}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={3}>
            <h3 className={classes.center} style={{marginTop: '10px'}}>Wating List</h3>
            <Card>
              <CardBody>
                <Table
                  tableHead={[
                    "#",
                    "Name",
                    "Time",
                    "Actions"
                  ]}
                  tableData={watingList}
                  customCellClasses={[
                    classes.center,
                    classes.center,
                    classes.right
                  ]}
                  customClassesForCells={[0, 2, 3]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.center,
                    classes.right
                  ]}
                  customHeadClassesForCells={[0, 2, 3]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <AssignModal 
          onOpen={this.state.assignModal}
          onClose={this.onCloseAssignModal.bind(this)} 
        />
      </div>
    );
  }
}

export default withStyles(adminStyle)(Admin);
