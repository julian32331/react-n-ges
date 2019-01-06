/**
 * Description: My Employess
 * Date: 25/12/2018
 * Author: Dnaijel
 */

import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";

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
import Close from "@material-ui/icons/Close";
import Person from "@material-ui/icons/Person";
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

import myEmployeesStyle from "assets/jss/material-dashboard-pro-react/views/myEmployees/myEmployeesStyle.jsx";
import NewOrUpdateModal from "./NewOrUpdateModal";
import DefaultAvatar from "assets/img/default-avatar.png";

class MyEmployees extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkInModal: false
    }
    this.getEmployeeList = this.getEmployeeList.bind(this);
    this.getEmployeeList();
  }
  componentDidUpdate() {
    console.log('this.props.list: ', this.props.list)
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

  getEmployeeList() {
    this.props.getEmployeeList({
      token: this.props.token,
      id: this.props.id
    })
  }

  render() {
    const { classes } = this.props;

    const fillButtons = [
      { color: "info", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button color={prop.color} className={classes.actionButton} key={key}>
          <prop.icon className={classes.icon} />
        </Button>
      );
    });

    // const avatar = <img src={DefaultAvatar} alt="..." />
    const avatar = 
      <div className={classes.picture}>
        <img
          src={DefaultAvatar}
          className={classes.picture_src}
          alt="..."
        />
      </div>

    return (
      <Card>
        <CardHeader className={classes.pb_0}>
          <div className={classes.cardHeader}>
            <GridContainer>
                <GridItem xs={12} sm={6}>
                    <h3 className={classes.cardTitle}>My Employees</h3>
                </GridItem>
                <GridItem xs={12} sm={6} className={classes.text_right}>
                    <Button 
                        color="info" 
                        onClick={() => this.onOpenCheckInModal()}
                    >                            
                        <Add /> Add Employee
                    </Button>
                </GridItem>
            </GridContainer>
          </div>
        </CardHeader>
        <CardBody className={classes.pt_0}>
          <GridContainer>
            <GridItem xs={3} sm={1} md={2} lg={1}>
              <FormLabel className={classes.labelHorizontal}>
                Search
              </FormLabel>
            </GridItem>
            <GridItem xs={9} sm={3} md={3} lg={2}>
              <CustomInput
                id="search"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "search"
                }}
              />
            </GridItem>
          </GridContainer>

          <Table
            tableHead={[
              "Name",
              "Position",
              "Phone Number",
              "Personalnr",
              "Avatar",
              "Verified",
              "Actions"
            ]}
            tableData={[
              [
                "Andrew Mike",
                "Deelop",
                "123456",
                "17.12.18",
                avatar,
                "14:34",
                fillButtons
              ],
              [
                "John Doe", 
                "Deelop",
                "123456", 
                "17.12.18", 
                avatar, 
                "14:34", 
                fillButtons
              ],
              [
                "Alex Mike",
                "Deelop",
                "123456",
                "17.12.18",
                avatar,
                "14:34",
                fillButtons
              ],
              [
                "Mike Monday",
                "Deelop",
                "123456",
                "17.12.18",
                avatar,
                "14:34",
                fillButtons
              ],
              [
                "Paul Dickens",
                "Deelop",
                "123456",
                "17.12.18",
                avatar,
                "14:34",
                fillButtons
              ]
            ]}
            customCellClasses={[
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
            ]}
            customClassesForCells={[0, 1, 2, 3, 4, 5]}
            customHeadCellClasses={[
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
            ]}
            customHeadClassesForCells={[0, 1, 2, 3, 4, 5]}
          />

          <NewOrUpdateModal 
            onOpen={this.state.checkInModal}
            onClose={this.onCloseCheckInModal.bind(this)} 
          />

        </CardBody>
      </Card>
    );
  }
}

MyEmployees.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default withStyles(myEmployeesStyle)(MyEmployees);

function mapStateToProps(state) {
  return {
      // token: state.user.token,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnZXNlbGxlLnNlIiwiaWF0IjoxNTQ2NTIyOTU2LCJleHAiOjE1NDcxMjc3NTZ9.S3-9MG0oIv0svs-QzTdw8pORFxCVsW46uVsgDUevr4I",
      // id: state.user.workingForId,
      id: 6,
      list: state.employees.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      getEmployeeList: Actions.getEmployeeList,
  }, dispatch);
}

export default withStyles(myEmployeesStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(MyEmployees)));

