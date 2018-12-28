/**
 * Descirption: Delete modal for saloon service
 * Date: 12/23/2018
 */

import React from "react";
import PropTypes from "prop-types";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Create from "@material-ui/icons/Create";
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
import Table from "components/Table/Table.jsx";

import openingHoursStyle from "assets/jss/material-dashboard-pro-react/views/openingHours/openingHoursStyle.jsx";

import DeleteModal from "./deleteModal";
import NewOrUpdateModal from "./newOrUpdateModal";

class OpeningHours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModal: false,
            newOrUpdateModal: false,
            btn_name: '',            
            checkedA: true,
        };
    }

    handleChange = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    onCloseDeleteModal() {
        this.setState({
            deleteModal: false
        })
    }

    onOpenDeleteModal() {
        this.setState({
            deleteModal: true
        })
    }

    onCloseNewOrUpdateModal() {
        this.setState({
            newOrUpdateModal: false
        })
    }

    onOpenNewOrUpdateModal(btn_name) {
        this.setState({
            newOrUpdateModal: true,
            btn_name: btn_name
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
        <div>
      <Card>
        <CardHeader>            
            <div className={classes.cardHeader}>
                <GridContainer>
                    <GridItem  xs={12} sm={6}>
                        <h3 className={classes.cardTitle}>Opening Hours</h3>
                    </GridItem>
                </GridContainer>
            </div>
        </CardHeader>
        <CardBody>
            <GridContainer justify="center" className={classes.mb_20}>
                <GridItem sm={12} md={10} lg={8}>
                    <GridContainer justify="center">
                        <GridItem xs={8} sm={4} md={4}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange("checkedA")}
                                    value="checkedA"
                                    classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.switchChecked,
                                    icon: classes.switchIcon,
                                    iconChecked: classes.switchIconChecked,
                                    bar: classes.switchBar
                                    }}
                                />
                                }
                                classes={{
                                label: classes.label
                                }}
                                label="Sunday"
                            />
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "From" }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "To" }}
                                />
                            </FormControl>
                        </GridItem>
                    </GridContainer>                          
                </GridItem>
                <GridItem sm={12} md={10} lg={8}>
                    <GridContainer justify="center">
                        <GridItem xs={8} sm={4} md={4}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange("checkedA")}
                                    value="checkedA"
                                    classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.switchChecked,
                                    icon: classes.switchIcon,
                                    iconChecked: classes.switchIconChecked,
                                    bar: classes.switchBar
                                    }}
                                />
                                }
                                classes={{
                                label: classes.label
                                }}
                                label="Sunday"
                            />
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "From" }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "To" }}
                                />
                            </FormControl>
                        </GridItem>
                    </GridContainer>                          
                </GridItem>
                <GridItem sm={12} md={10} lg={8}>
                    <GridContainer justify="center">
                        <GridItem xs={8} sm={4} md={4}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange("checkedA")}
                                    value="checkedA"
                                    classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.switchChecked,
                                    icon: classes.switchIcon,
                                    iconChecked: classes.switchIconChecked,
                                    bar: classes.switchBar
                                    }}
                                />
                                }
                                classes={{
                                label: classes.label
                                }}
                                label="Sunday"
                            />
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "From" }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "To" }}
                                />
                            </FormControl>
                        </GridItem>
                    </GridContainer>                          
                </GridItem>
                <GridItem sm={12} md={10} lg={8}>
                    <GridContainer justify="center">
                        <GridItem xs={8} sm={4} md={4}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange("checkedA")}
                                    value="checkedA"
                                    classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.switchChecked,
                                    icon: classes.switchIcon,
                                    iconChecked: classes.switchIconChecked,
                                    bar: classes.switchBar
                                    }}
                                />
                                }
                                classes={{
                                label: classes.label
                                }}
                                label="Sunday"
                            />
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "From" }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "To" }}
                                />
                            </FormControl>
                        </GridItem>
                    </GridContainer>                          
                </GridItem>
                <GridItem sm={12} md={10} lg={8}>
                    <GridContainer justify="center">
                        <GridItem xs={8} sm={4} md={4}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange("checkedA")}
                                    value="checkedA"
                                    classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.switchChecked,
                                    icon: classes.switchIcon,
                                    iconChecked: classes.switchIconChecked,
                                    bar: classes.switchBar
                                    }}
                                />
                                }
                                classes={{
                                label: classes.label
                                }}
                                label="Sunday"
                            />
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "From" }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "To" }}
                                />
                            </FormControl>
                        </GridItem>
                    </GridContainer>                          
                </GridItem>
                <GridItem sm={12} md={10} lg={8}>
                    <GridContainer justify="center">
                        <GridItem xs={8} sm={4} md={4}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange("checkedA")}
                                    value="checkedA"
                                    classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.switchChecked,
                                    icon: classes.switchIcon,
                                    iconChecked: classes.switchIconChecked,
                                    bar: classes.switchBar
                                    }}
                                />
                                }
                                classes={{
                                label: classes.label
                                }}
                                label="Sunday"
                            />
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "From" }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "To" }}
                                />
                            </FormControl>
                        </GridItem>
                    </GridContainer>                          
                </GridItem>
                <GridItem sm={12} md={10} lg={8}>
                    <GridContainer justify="center">
                        <GridItem xs={8} sm={4} md={4}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange("checkedA")}
                                    value="checkedA"
                                    classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.switchChecked,
                                    icon: classes.switchIcon,
                                    iconChecked: classes.switchIconChecked,
                                    bar: classes.switchBar
                                    }}
                                />
                                }
                                classes={{
                                label: classes.label
                                }}
                                label="Sunday"
                            />
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "From" }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={8} sm={3} md={2}>
                            <FormControl fullWidth>
                                <Datetime
                                    dateFormat={false}
                                    inputProps={{ placeholder: "To" }}
                                />
                            </FormControl>
                        </GridItem>
                    </GridContainer>                          
                </GridItem>
            </GridContainer>

        </CardBody>
      </Card>
      <Card>
      <CardHeader>            
          <div className={classes.cardHeader}>
              <GridContainer>
                  <GridItem xs={12} sm={6}>
                      <h3 className={classes.cardTitle}>Special Days</h3>
                  </GridItem>
                  <GridItem xs={12} sm={6} className={classes.text_right}>
                      <Button 
                          color="info" 
                          onClick={() => this.onOpenNewOrUpdateModal("New")}
                      >                            
                          <Add /> Add Special Event
                      </Button>
                  </GridItem>
              </GridContainer>
          </div>
      </CardHeader>
      <CardBody>
        <Table
            tableHead={[
                "Name",
                "Date",
                "From",
                "To",
                "Actions"
            ]}
            tableData={[
                [
                "Andrew Mike",
                "Develop",
                "2013",
                "€ 99,225",
                fillButtons
                ],
                ["John Doe", "Design", "2012", "€ 89,241", fillButtons],
                [
                "Alex Mike",
                "Design",
                "2010",
                "€ 92,144",
                fillButtons
                ],
                [
                "Mike Monday",
                "Marketing",
                "2013",
                "€ 49,990",
                fillButtons
                ],
                [
                "Paul Dickens",
                "Communication",
                "2015",
                "€ 69,201",
                fillButtons
                ]
            ]}
            customCellClasses={[
                classes.center,
                classes.center,
                classes.center,
                classes.center,
                classes.center,
            ]}
            customClassesForCells={[0, 1, 2, 3, 4]}
            customHeadCellClasses={[
                classes.center,
                classes.center,
                classes.center,
                classes.center,
                classes.center,
            ]}
            customHeadClassesForCells={[0, 1, 2, 3, 4]}
            />

          <DeleteModal 
              onOpen={this.state.deleteModal}
              onClose={this.onCloseDeleteModal.bind(this)} 
          />
              
          <NewOrUpdateModal 
              onOpen={this.state.newOrUpdateModal}
              onClose={this.onCloseNewOrUpdateModal.bind(this)} 
              btn_name={this.state.btn_name}
          />

      </CardBody>
    </Card>
    </div>
    );
  }
}

OpeningHours.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(openingHoursStyle)(OpeningHours);
