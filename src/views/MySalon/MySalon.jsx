import React from "react";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";

import mySalonStyle from "assets/jss/material-dashboard-pro-react/views/mySalon/mySalonStyle.jsx";
import AddSalonModal from "./AddSalonModal";

class MySalon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addSalonModal: false,
    };
  }

  componentWillMount() {
      this.props.getUserData();
      setTimeout(() => {
        this.getCompanySalon(this.props.workingForId);
      }, 100);
  }
    
  getCompanySalon(id) {
      this.props.getCompanySalon({
        workingForId: id
      })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.workingForId !== nextProps.workingForId) {
      this.getCompanySalon(nextProps.workingForId);
    }
  }

  onCloseAddSalonModal() {
    this.setState({
      addSalonModal: false
    })
  }
  onOpenAddSalonModal() {
    this.setState({
      addSalonModal: true
    })
  }

  render() {
    const { classes } = this.props;
    const button = 
      <Button simple color="info" size="sm" className={classes.actionButton} >
        <ArrowForwardIos className={classes.icon} />
      </Button>

    let arr = [];
    this.props.data.map(company => {
      let temp = {
        companyName: "",
        salons: []
      };

      temp.companyName = company.companyName;
      company.salons.map(salon => {
        let temp1 = [];

        temp1.push(salon);
        temp1.push(button);

        temp.salons.push(temp1);
      });
      arr.push(temp);
    });

    let accordian = [];
    arr.map(item => {
      let temp2 = {
        title: item.companyName,
        content: (
          <div className={classes.salonContainer}>
            <GridContainer justify="space-between">
              <GridItem xs={12} sm={6}>
                {/* <GridContainer alignItems="center">
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
                </GridContainer> */}
              </GridItem>
              <GridItem xs={12} sm={6} className={classes.text_right + " " + classes.mt_27}>
                <Button 
                    color="info" 
                    size="sm"
                    onClick={() => this.onOpenAddSalonModal()}
                >                            
                    <Add /> Lägg till salong
                </Button>
              </GridItem>
              <GridItem xs={12}>
                <Table
                  tableData={item.salons}
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
      };
      accordian.push(temp2);
    })


    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader className={classes.pb_0}>
                <div className={classes.cardHeader}>
                  <GridContainer>
                      <GridItem xs={12} sm={6}>
                          <h3 className={classes.cardTitle}>Företag/salonger</h3>
                      </GridItem>
                      <GridItem xs={12} sm={6} className={classes.text_right}>
                          <Button 
                              color="info" 
                              size="sm"
                              onClick={() => this.props.history.push('/register')}
                          >                            
                              <Add /> Lägg till företag
                          </Button>
                      </GridItem>
                  </GridContainer>
                </div>
              </CardHeader>
              <CardBody>
                <Accordion
                  active={0}
                  collapses={accordian}
                />                
                <AddSalonModal 
                  onOpen={this.state.addSalonModal}
                  onClose={this.onCloseAddSalonModal.bind(this)}
                /> 
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workingForId    : state.user.workingForId,
    data: state.mySalons.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      getUserData: Actions.getUserData,
      getCompanySalon: Actions.getCompanySalon 
  }, dispatch);
}

export default withStyles(mySalonStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(MySalon)));