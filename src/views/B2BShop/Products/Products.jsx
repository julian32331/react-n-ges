import React from "react";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import productsStyle from "assets/jss/material-dashboard-pro-react/views/b2bshop/productsStyle.jsx";

import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";

class B2BShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.props.getUserData();
    setTimeout(() => {
      this.props.getB2BShopProducts();
    }, 100);
  }

  getB2BShopProducts() {
    this.props.getB2BShopProducts();
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes } = this.props;
    const fillButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button color={prop.color} className={classes.actionButton} key={key}>
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    const simpleButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          color={prop.color}
          simple
          className={classes.actionButton}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    const roundButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          round
          color={prop.color}
          className={classes.actionButton + " " + classes.actionButtonRound}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader className={classes.pb_0}>
              <div className={classes.cardHeader}>
                <GridContainer>
                    <GridItem xs={12} sm={6}>
                        <h3 className={classes.cardTitle}>Products</h3>
                    </GridItem>
                </GridContainer>
              </div>
            </CardHeader>
            <CardBody>              
              <GridContainer>
                <GridItem xs={3} sm={1} md={2} lg={1}>
                  <FormLabel className={classes.labelHorizontal}>
                    Sök :
                  </FormLabel>
                </GridItem>
                <GridItem xs={9} sm={3} md={3} lg={2}>
                  <CustomInput
                    id="search"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "search",
                      onChange: event =>
                        this.searchHandler("search", event),
                      value: this.state.search               
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={4}>
                </GridItem>
                <GridItem xs={12} sm={8}>
                  <Table
                    tableData={[
                      [
                        <div className={classes.imgContainer}>
                          <img src={product1} alt="..." className={classes.img} />
                        </div>,
                        <span>
                          <a href="#" className={classes.tdNameAnchor}>
                            Product Name
                          </a>
                          <br />
                          <small className={classes.tdNameSmall}>
                            SKU
                          </small>
                        </span>,
                        <span>
                          <h4 className={classes.price}><small className={classes.tdNumberSmall}>kr</small> 549</h4>
                          <div>
                            <TextField
                              id="outlined-bare"
                              className={classes.textField}
                              defaultValue={0}
                              margin="normal"
                              variant="outlined"
                              type="number"
                              inputProps={{
                                className: classes.qty
                              }}
                            />
                            <Button color="info" round size="sm" className={classes.marginRight}>
                              Add
                            </Button>
                          </div>
                        </span>
                      ],
                      [
                        <div className={classes.imgContainer}>
                          <img src={product1} alt="..." className={classes.img} />
                        </div>,
                        <span>
                          <a href="#" className={classes.tdNameAnchor}>
                            Product Name
                          </a>
                          <br />
                          <small className={classes.tdNameSmall}>
                            SKU
                          </small>
                        </span>,
                        <span>
                          <h4 className={classes.price}><small className={classes.tdNumberSmall}>kr</small> 549</h4>
                          <div>
                            <TextField
                              id="outlined-bare"
                              className={classes.textField}
                              defaultValue={0}
                              margin="normal"
                              variant="outlined"
                              type="number"
                              inputProps={{
                                className: classes.qty
                              }}
                            />
                            <Button color="info" round size="sm" className={classes.marginRight}>
                              Add
                            </Button>
                          </div>
                        </span>
                      ],
                      [
                        <div className={classes.imgContainer}>
                          <img src={product1} alt="..." className={classes.img} />
                        </div>,
                        <span>
                          <a href="#" className={classes.tdNameAnchor}>
                            Product Name
                          </a>
                          <br />
                          <small className={classes.tdNameSmall}>
                            SKU
                          </small>
                        </span>,
                        <span>
                          <h4 className={classes.price}><small className={classes.tdNumberSmall}>kr</small> 549</h4>
                          <div>
                            <TextField
                              id="outlined-bare"
                              className={classes.textField}
                              defaultValue={0}
                              margin="normal"
                              variant="outlined"
                              type="number"
                              inputProps={{
                                className: classes.qty
                              }}
                            />
                            <Button color="info" round size="sm" className={classes.marginRight}>
                              Add
                            </Button>
                          </div>
                        </span>
                      ],
                    ]}
                    tableShopping
                    customCellClasses={[
                      classes.tdName,
                      classes.tdNumber
                    ]}
                    customClassesForCells={[1, 2]}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserData : Actions.getUserData,
        getB2BShopProducts : Actions.getB2BShopProducts
    }, dispatch);
}

export default withStyles(productsStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(B2BShop)));
