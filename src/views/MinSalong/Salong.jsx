import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Add from "@material-ui/icons/Add";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";

import salonStyle from "assets/jss/material-dashboard-pro-react/views/salonStyle.jsx";

class Salong extends React.Component {
  render() {
    const { classes } = this.props;
    const button = 
        <Button simple color="info" size="sm" className={classes.actionButton} >
            <ArrowForwardIos className={classes.icon} />
        </Button>
    let data = [
      ["Salon1", button],
      ["Salon2", button],
      ["Salon3", button],
      ["Salon4", button]
    ]
    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader className={classes.pb_0}>
                <div className={classes.cardHeader}>
                  <GridContainer>
                      <GridItem xs={12} sm={6}>
                          <h3 className={classes.cardTitle}>Companies / Salons</h3>
                      </GridItem>
                      <GridItem xs={12} sm={6} className={classes.text_right}>
                          <Button 
                              color="info" 
                              size="sm"
                              // onClick={() => this.onOpenNewOrUpdateModal('New Employee')}
                          >                            
                              <Add /> Add Company
                          </Button>
                      </GridItem>
                  </GridContainer>
                </div>
              </CardHeader>
              <CardBody>
                <Accordion
                  active={0}
                  collapses={[
                    {
                      title: "Company 1",
                      content: (
                        <div className={classes.salonContainer}>
                          <GridContainer justify="space-between">
                            <GridItem xs={12} sm={6}>
                              <GridContainer alignItems="center">
                                <GridItem xs={5} sm={4} md={3} className={classes.text_right + " " + classes.mt_15}>
                                  <FormLabel className={classes.labelHorizontal}>
                                    Search :
                                  </FormLabel>
                                </GridItem>
                                <GridItem xs={7} sm={8} md={6}>
                                  <CustomInput
                                    id="search"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "search",
                                      // onChange: event =>
                                      //   this.searchHandler("search", event),
                                      // value: this.state.search               
                                    }}
                                  />
                                </GridItem>
                              </GridContainer>
                            </GridItem>
                            <GridItem xs={12} sm={6} className={classes.text_right + " " + classes.mt_27}>
                              <Button 
                                  color="info" 
                                  size="sm"
                                  // onClick={() => this.onOpenNewOrUpdateModal('New Employee')}
                              >                            
                                  <Add /> Add Salon
                              </Button>
                            </GridItem>
                            <GridItem xs={12}>
                              <Table
                                tableData={data}
                                customCellClasses={[
                                  classes.left,
                                  classes.right,
                                ]}
                                customClassesForCells={[0, 1]}
                                customHeadCellClasses={[
                                  classes.left,
                                  classes.right,
                                ]}
                                customHeadClassesForCells={[0, 1]}
                              />
                            </GridItem>
                          </GridContainer>
                        </div>
                      )
                    },
                    {
                      title: "Company 2",
                      content: (
                        <div className={classes.salonContainer}>
                          <GridContainer justify="space-between">
                            <GridItem xs={12} sm={6}>
                              <GridContainer alignItems="center">
                                <GridItem xs={5} sm={4} md={3} className={classes.text_right + " " + classes.mt_15}>
                                  <FormLabel className={classes.labelHorizontal}>
                                    Search :
                                  </FormLabel>
                                </GridItem>
                                <GridItem xs={7} sm={8} md={6}>
                                  <CustomInput
                                    id="search"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "search",
                                      // onChange: event =>
                                      //   this.searchHandler("search", event),
                                      // value: this.state.search               
                                    }}
                                  />
                                </GridItem>
                              </GridContainer>
                            </GridItem>
                            <GridItem xs={12} sm={6} className={classes.text_right + " " + classes.mt_27}>
                              <Button 
                                  color="info" 
                                  size="sm"
                                  // onClick={() => this.onOpenNewOrUpdateModal('New Employee')}
                              >                            
                                  <Add /> Add Salon
                              </Button>
                            </GridItem>
                            <GridItem xs={12}>
                              <Table
                                tableData={data}
                                customCellClasses={[
                                  classes.left,
                                  classes.right,
                                ]}
                                customClassesForCells={[0, 1]}
                                customHeadCellClasses={[
                                  classes.left,
                                  classes.right,
                                ]}
                                customHeadClassesForCells={[0, 1]}
                              />
                            </GridItem>
                          </GridContainer>
                        </div>
                      )
                    },
                    {
                      title: "Company 3",
                      content: (
                        <div className={classes.salonContainer}>
                          <GridContainer justify="space-between">
                            <GridItem xs={12} sm={6}>
                              <GridContainer alignItems="center">
                                <GridItem xs={5} sm={4} md={3} className={classes.text_right + " " + classes.mt_15}>
                                  <FormLabel className={classes.labelHorizontal}>
                                    Search :
                                  </FormLabel>
                                </GridItem>
                                <GridItem xs={7} sm={8} md={6}>
                                  <CustomInput
                                    id="search"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "search",
                                      // onChange: event =>
                                      //   this.searchHandler("search", event),
                                      // value: this.state.search               
                                    }}
                                  />
                                </GridItem>
                              </GridContainer>
                            </GridItem>
                            <GridItem xs={12} sm={6} className={classes.text_right + " " + classes.mt_27}>
                              <Button 
                                  color="info" 
                                  size="sm"
                                  // onClick={() => this.onOpenNewOrUpdateModal('New Employee')}
                              >                            
                                  <Add /> Add Salon
                              </Button>
                            </GridItem>
                            <GridItem xs={12}>
                              <Table
                                tableData={data}
                                customCellClasses={[
                                  classes.left,
                                  classes.right,
                                ]}
                                customClassesForCells={[0, 1]}
                                customHeadCellClasses={[
                                  classes.left,
                                  classes.right,
                                ]}
                                customHeadClassesForCells={[0, 1]}
                              />
                            </GridItem>
                          </GridContainer>
                        </div>
                      )
                    },
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(salonStyle)(Salong);
