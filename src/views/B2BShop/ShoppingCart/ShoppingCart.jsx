import React from "react";

import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Reply from "@material-ui/icons/Reply";

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
import ConfirmModal from "./ConfirmModal";

import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      confirmModal: false,
      isCompleted: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.props.getUserData();
    setTimeout(() => {
      this.props.getOrders();
    }, 100);
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
  
  // Open and close New modal
  onCloseConfirmModal(isCompleted) {
    this.setState({
      isCompleted: isCompleted,
      confirmModal: false
    })
  }
  onOpenConfirmModal = (title, data=null) => {
    this.setState({
      confirmModal: true,
      modalData: data
    })
  }

  render() {
    console.log('orders: ', this.props.orders)
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
    let orders = [];
    this.props.orders.map((order, key) => {
      let temp = [];
      temp.push(
        <div className={classes.imgContainer}>
          <img src={order.product.imageURL} alt="..." className={classes.img} />
        </div>
      )
      temp.push(
        <span>
          <a href="" className={classes.tdNameAnchor}>
            {order.product.name}
          </a>
          <br />
          <small className={classes.tdNameSmall}>
            {order.product.articleNo}
          </small>
        </span>
      )
      temp.push(
        <span>
          <small className={classes.tdNumberSmall}>kr</small> {order.product.price}
        </span>
      )
      temp.push(
        <div className={classes.qty}>
          {order.qty}
          {/* <CustomInput
            id="qty"
            inputProps={{
              type: "number",
              value: order.qty
            }}
          /> */}
        </div>
      )
      temp.push(
        <span>
          <small className={classes.tdNumberSmall}>€</small> {order.product.price * order.qty}
        </span>
      )
      temp.push(
        <Button
          justIcon
          round
          color="danger"
          size="sm"
          className={classes.marginRight}
        >
          <Close className={classes.icons} />
        </Button>
      )
      orders.push(temp);
    })
    orders.push(
      {
        total: true,
        colspan: "3",
        amount: (
          <span>
            <small>€</small>2,346
          </span>
        )
      }
    )
    orders.push(        
      {
        purchase: true,
        colspan: "3",
        col: {
          colspan: 3,
          text: (
            <Button color="info" round onClick={this.onOpenConfirmModal}>
              Complete Purchase{" "}
              <KeyboardArrowRight className={classes.icon} />
            </Button>
          )
        }
      }
    )
    console.log('orders : ', orders)
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
          <CardHeader className={classes.pb_0}>
              <div className={classes.cardHeader}>
                <GridContainer>
                    <GridItem xs={12} sm={6}>
                        <h3 className={classes.cardTitle}>Shopping Cart</h3>
                    </GridItem>
                </GridContainer>
              </div>
            </CardHeader>
            {
              this.state.isCompleted? (
                <CardBody className={classes.center}>
                  <h3>Order is Completed</h3>
                  <Button
                    color="success"
                    onClick={() => this.props.history.push('/b2bshop/products')}
                  >
                    <Reply className={classes.icon} /> Go to Products
                  </Button>
                </CardBody>
              ) : (
                <CardBody>              
                  <GridContainer>
                    <GridItem xs={3} sm={1} md={2} lg={1}>
                      <FormLabel className={classes.labelHorizontal}>
                        Search :
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
                  <Table
                    tableHead={[
                      "",
                      "PRODUCT",
                      "PRICE",
                      "QTY",
                      "AMOUNT",
                      ""
                    ]}
                    tableData={orders}
                    tableShopping
                    customHeadCellClasses={[
                      classes.center,
                      classes.center,
                      classes.right,
                      classes.right
                    ]}
                    customHeadClassesForCells={[0, 2, 3, 4, 5]}
                    customCellClasses={[
                      classes.tdName,
                      classes.tdNumber + " " + classes.center,
                      classes.tdNumber + " " + classes.right,
                      classes.tdNumber + " " + classes.right,
                    ]}
                    customClassesForCells={[1, 2, 3, 4]}
                  />
                </CardBody>
              )
            }
            
          </Card>
          <ConfirmModal 
            onOpen={this.state.confirmModal}
            onClose={this.onCloseConfirmModal.bind(this)}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    workingForId: state.user.workingForId,
    orders: state.b2bshop.orders
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserData: Actions.getUserData,
    getOrders: Actions.getOrders
  }, dispatch);
}

export default withStyles(productsStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)));
