import React from "react";

import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

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

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      search: "",
      confirmModal: false,
      isCompleted: false
    };
  }

  componentDidMount() {
    this.props.getUserData();
    setTimeout(() => {
      this.props.getShippingAddress({
        workingForId: this.props.workingForId
      });
      this.props.getCart();
    }, 100);
  }

  searchHandler(name, event) {
    this.setState({ [name]: event.target.value });

    let key = event.target.value.toLowerCase();
    
    let temp = this.props.cart.filter( item => {
      return item.product.name.toLowerCase().indexOf(key) !== -1
    });

    this.setState({
      cart: temp
    })
  };

  remove = (id) => {
    let cart = this.state.cart? this.state.cart : [];
    cart.map((item, key) => {
      if(item.product.id === id)
        cart.splice(key, 1)
    })

    this.setState({
      cart: cart
    });
  }
  changeQTY = (event, key) => {
    let cart = this.state.cart? this.state.cart : [];
    cart[key]['quantityOrdered'] = event.target.value;

    this.setState({
      cart: cart
    });
  }

  makeCart = () => {
    let cart = [];
    this.state.cart.map(item => {
      let temp = {};

      temp.articleNo = item.product.articleNo;
      temp.quantityOrdered = item.quantityOrdered;
      
      cart.push(temp);
    })

    return cart;
  }
  
  // Open and close New modal
  onCloseConfirmModal = (isCompleted) => {
    console.log('isCompleted: ', isCompleted)
    this.setState({
      isCompleted: isCompleted,
      confirmModal: false
    })
  }

  render() {
    const { classes } = this.props;

    let booked = [];
    let total_price = 0
    this.state.cart.map((item, key) => {
      let temp = [];
      total_price += Number(item.product.price) * item.quantityOrdered;
      temp.push(
        <div className={classes.imgContainer}>
          <img src={item.product.imageURL} alt="..." className={classes.img} />
        </div>
      )
      temp.push(
        <span>
          <a href="" className={classes.tdNameAnchor}>
            {item.product.name}
          </a>
          <br />
          <small className={classes.tdNameSmall}>
            {item.product.articleNo}
          </small>
        </span>
      )
      temp.push(
        <span>
          <small className={classes.tdNumberSmall}>kr</small> {item.product.price}
        </span>
      )
      temp.push(
        <div className={classes.qty}>
          <TextField
            id="outlined-bare"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            type="number"
            inputProps={{
              className: classes.qty,
              onChange: (event)=> event.target.value > 2 && this.changeQTY(event, key)
            }}
            value={this.state.cart[key]['quantityOrdered']? this.state.cart[key]['quantityOrdered'] : 3}
          />
        </div>
      )
      temp.push(
        <span>
          <small className={classes.tdNumberSmall}>kr</small> {Number(item.product.price) * item.quantityOrdered}
        </span>
      )
      temp.push(
        <Button
          justIcon
          round
          color="danger"
          size="sm"
          className={classes.marginRight}
          onClick={() => this.remove(item.product.id)}
        >
          <Close className={classes.icons} />
        </Button>
      )
      booked.push(temp);
    })
    booked.push(
      {
        total: true,
        colspan: "3",
        amount: (
          <span>
            <small>kr</small> {total_price}
          </span>
        )
      }
    )
    booked.push(        
      {
        purchase: true,
        colspan: "3",
        col: {
          colspan: 3,
          text: (
            <Button color="info" round onClick={() => this.setState({confirmModal: true})}>
              Complete Purchase{" "}
              <KeyboardArrowRight className={classes.icon} />
            </Button>
          )
        }
      }
    )
    
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
                  {
                    this.props.loading? (
                      <div className={classes.center}>
                        <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                      </div>
                    ) : (
                      this.props.cart.length > 0? (
                        <div>
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
                          <Table
                            tableHead={[
                              "",
                              "PRODUCT",
                              "PRICE",
                              "QTY",
                              "AMOUNT",
                              ""
                            ]}
                            tableData={booked}
                            tableShopping
                            customHeadCellClasses={[
                              classes.center,
                              classes.center,
                              classes.center,
                              classes.right
                            ]}
                            customHeadClassesForCells={[0, 2, 3, 4, 5]}
                            customCellClasses={[
                              classes.tdName,
                              classes.tdNumber + " " + classes.center,
                              classes.center,
                              classes.tdNumber + " " + classes.right,
                            ]}
                            customClassesForCells={[1, 2, 3, 4]}
                          />
                        </div>
                      ) : (
                        <h3 className={classes.center}>No data</h3>
                      )
                      
                    )
                  }       
                  
                </CardBody>
              )
            }
            
          </Card>
          <ConfirmModal 
            onOpen={this.state.confirmModal}
            onClose={(status) => this.onCloseConfirmModal(status)}
            address={this.props.shipping_address}
            cart={this.makeCart()}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    workingForId    : state.user.workingForId,
    cart            : state.b2b_shop.cart.cart,
    shipping_address: state.b2b_shop.cart.shipping_address,
    loading         : state.b2b_shop.cart.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserData         : Actions.getUserData,
    getCart             : Actions.getCart,
    getShippingAddress  : Actions.getShippingAddress
  }, dispatch);
}

export default withStyles(productsStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)));
