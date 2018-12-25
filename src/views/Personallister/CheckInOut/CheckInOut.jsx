/**
 * Description: Dashboard view
 * Date: 12/21/2018
 * Author: Dnaijel
 */

import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import Add from "@material-ui/icons/Add";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";

import checkInOutStyle from "assets/jss/material-dashboard-pro-react/views1/checkInOut/checkInOutStyle.jsx";
import CheckInModal from "./CheckInModal";

class CheckInOut extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkInModal: false
    }
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

  render() {
    const { classes } = this.props;

    const checkOutButton =
        <Button color="danger" className={classes.actionButton}>
          <Add className={classes.icon} /> Check Out User
        </Button>

    return (
      <Card>
        <CardHeader className={classes.pb_0}>
          <div className={classes.cardHeader}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <h3 className={classes.cardTitle}>Check In/Out</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={6} className={classes.text_right}>
                    <Button 
                        color="info" 
                        onClick={() => this.onOpenCheckInModal()}
                    >                            
                        <Add /> Check In USER
                    </Button>
                </GridItem>
            </GridContainer>
          </div>
        </CardHeader>
        <CardBody className={classes.pt_0}>
          <GridContainer>
            <GridItem md={1}>
              <FormLabel className={classes.labelHorizontal}>
                Search
              </FormLabel>
            </GridItem>
            <GridItem md={2}>
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
            <GridItem>
              <FormLabel className={classes.labelHorizontal}>
                From
              </FormLabel>
            </GridItem>
            <GridItem md={1}>
              <FormControl fullWidth className={classes.pt_20}>
                <Datetime
                  timeFormat={false}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormLabel className={classes.labelHorizontal}>
                To
              </FormLabel>
            </GridItem>
            <GridItem md={1}>
              <FormControl fullWidth className={classes.pt_20}>
                <Datetime
                  timeFormat={false}
                />
              </FormControl>
            </GridItem>
          </GridContainer>

          <Table
            tableHead={[
              "Name",
              "Employe number",
              "Date",
              "Checked In",
              "Checked Out",
              "Action"
            ]}
            tableData={[
              [
                "Andrew Mike",
                "123456",
                "17.12.18",
                "14:34",
                "14:34",
                checkOutButton
              ],
              [
                "John Doe", 
                "123456", 
                "17.12.18", 
                "14:34", 
                "14:34", 
                ""
              ],
              [
                "Alex Mike",
                "123456",
                "17.12.18",
                "14:34",
                "14:34",
                checkOutButton
              ],
              [
                "Mike Monday",
                "123456",
                "17.12.18",
                "14:34",
                "14:34",
                ""
              ],
              [
                "Paul Dickens",
                "123456",
                "17.12.18",
                "14:34",
                "14:34",
                ""
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

          <CheckInModal 
            onOpen={this.state.checkInModal}
            onClose={this.onCloseCheckInModal.bind(this)} 
          />

        </CardBody>
      </Card>
    );
  }
}

CheckInOut.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(checkInOutStyle)(CheckInOut);
