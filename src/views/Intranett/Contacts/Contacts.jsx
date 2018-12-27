/**
 * Description: Contacts
 * Date: 26/12/2018
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

import checkInOutStyle from "assets/jss/material-dashboard-pro-react/views/checkInOut/checkInOutStyle.jsx";
import NewOrUpdateModal from "./NewOrUpdateModal";

class Contacts extends React.Component {

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

    return (
      <Card>
        <CardHeader className={classes.pb_0}>
          <div className={classes.cardHeader}>
            <GridContainer>
                <GridItem xs={12} sm={6}>
                    <h3 className={classes.cardTitle}>Contacts</h3>
                </GridItem>
                {/* <GridItem xs={12} sm={6} className={classes.text_right}>
                    <Button 
                        color="info" 
                        onClick={() => this.onOpenCheckInModal()}
                    >                            
                        <Add /> Add Contact
                    </Button>
                </GridItem> */}
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
              "Email",
              "Phone Number",
            ]}
            tableData={[
              [
                "Andrew Mike",
                "Deelop",
                "123456",
                "17.12.18",
              ],
              [
                "John Doe", 
                "Deelop",
                "123456", 
                "17.12.18"
              ],
              [
                "Alex Mike",
                "Deelop",
                "123456",
                "17.12.18"
              ],
              [
                "Mike Monday",
                "Deelop",
                "123456",
                "17.12.18"
              ],
              [
                "Paul Dickens",
                "Deelop",
                "123456",
                "17.12.18"
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

Contacts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(checkInOutStyle)(Contacts);
