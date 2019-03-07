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
import Pagination from "components/Pagination/Pagination.jsx";

import productsStyle from "assets/jss/material-dashboard-pro-react/views/b2bshop/productsStyle.jsx";

import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";

class B2BShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",      
      pageOffset: 0,
      activedPageNo: 1,      
    };
    this.products = [];    
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

  initStateForQty(index) {
    this.setState({
      ["qty_" + index]: 0
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.products) {
      this.products = nextProps.products;
      for(let i = 0; i < this.products.length; i++) {
        this.initStateForQty(i);
      }
    }
  }

  searchHandler(name, event) {
    this.setState({ [name]: event.target.value });
    this.search(event.target.value.toLowerCase());
  };
  
  search(value) {
    let temp = this.props.products.filter( product => {
      return product.name.toLowerCase().indexOf(value) !== -1
    });
    this.setState({
      activedPageNo: 1
    })

    this.products = temp;
  }

  // Pagination actions
  changePagination(param) {
    let totalPages = this.products.length % 10 > 0? Math.floor(this.products.length / 10 + 1) : this.products.length / 10;
    if(param === 1) {
      if((this.state.pageOffset + 1) * 5 < totalPages)
        this.setState(prevState => ({
          pageOffset: prevState.pageOffset + 1,
          activedPageNo: (prevState.pageOffset + 1) * 5 + 1
        }));
    } else {
      if(this.state.pageOffset - 1 >= 0)
        this.setState(prevState => ({
          pageOffset: prevState.pageOffset - 1,
          activedPageNo: (prevState.pageOffset - 1) * 5 + 5
        }));
    }    
  }
  skipOne(param) {
    let totalPages = this.products.length % 10 > 0? Math.floor(this.products.length / 10 + 1) : this.products.length / 10;
    if(param === 1) {      
      if(this.state.activedPageNo < totalPages) {
        if(this.state.activedPageNo + 1 > this.state.pageOffset * 5 + 5) {
          this.setState(prevState => ({
            pageOffset: prevState.pageOffset + 1,
            activedPageNo: prevState.activedPageNo + 1
          }));
        } else {
          this.setState(prevState => ({
            activedPageNo: prevState.activedPageNo + 1
          }));
        }
      }
    } else {
      if(this.state.activedPageNo - 1 > 0) {
        if(this.state.activedPageNo - 1 <= this.state.pageOffset * 5) {
          this.setState(prevState => ({
            pageOffset: prevState.pageOffset - 1,
            activedPageNo: prevState.activedPageNo - 1
          }));
        } else {
          this.setState(prevState => ({
            activedPageNo: prevState.activedPageNo - 1
          }));
        }
      }
    }
  }
  clickNumber(param) {
    console.log('params: ', param)
    this.setState({
      activedPageNo: param
    })
  }
  
  render() {
    const { classes } = this.props;
    const { activedPageNo } = this.state;

    const product_image = src => {
      return (        
        <div className={classes.imgContainer}>
          <img src={src} alt="..." className={classes.img} />
        </div>
      )
    }

    const product_name = (name, sku) => {
      return (
        <span>
          <a className={classes.tdNameAnchor}>
            {name}
          </a>
          <br />
          <small className={classes.tdNameSmall}>
            {sku}
          </small>
        </span>
      )
    }

    const product_price_qty = (price, index) => {
      // let qty = 0
      const addProduct = (index) => {
        // qty++;
        console.log('focus: ', this.props["qty_" + index])
        this.setState(prevState => ({
          ["qty_" + index]: prevState["qty_" + index] + 1
        }))
      }
      return (        
        <span>
          <h4 className={classes.price}><small className={classes.tdNumberSmall}>kr</small> {price}</h4>
          <div>
            <TextField
              id="outlined-bare"
              className={classes.textField}
              value={this.state["qty_" + index]? this.state["qty_" + index] : 0}
              margin="normal"
              variant="outlined"
              type="number"
              inputProps={{
                className: classes.qty
              }}
            />
            <Button color="info" round size="sm" className={classes.marginRight} onClick={() => addProduct(index)}>
              Add
            </Button>
          </div>
        </span>
      )
    } 

    let products = [];
    this.products.map((product, index) => {
      let temp = [];
      
      if(index >= (activedPageNo - 1) * 10 && index < activedPageNo * 10) {
        temp.push(product_image(product.imageURL));
        temp.push(product_name(product.name, product.articleNo));
        temp.push(product_price_qty(product.price, index));

        products.push(temp);
      }
    })
    
    let pageNations = [];
    let totalPages = this.products.length % 10 > 0? Math.floor(this.products.length / 10 + 1) : this.products.length / 10;
    console.log('totalPages: ', totalPages)

    let temp = [];
    if(this.state.pageOffset !== 0) temp.push({ text: "<<", onClick: () => this.changePagination(-1) });

    if((this.state.pageOffset + 1) * 5 < totalPages) {
      for(let i = 1; i <= 5; i++) {
        temp.push(
          { text: this.state.pageOffset * 5 + i, active: this.state.activedPageNo === this.state.pageOffset * 5 + i, onClick: () => this.clickNumber(this.state.pageOffset * 5 + i) },
        )
      }
    } else {
      for(let i = 1; i <= totalPages - this.state.pageOffset * 5; i++) {
        temp.push(
          { text: this.state.pageOffset * 5 + i, active: this.state.activedPageNo === this.state.pageOffset * 5 + i, onClick: () => this.clickNumber(this.state.pageOffset * 5 + i) },
        )
      }
    }
    
    if(this.state.pageOffset !== totalPages && totalPages > 5) temp.push({ text: ">>", onClick: () => this.changePagination(1) });

    if(totalPages > 0)
      pageNations = [
        { text: "PREV", onClick: () => this.skipOne(-1) },
        ...temp,
        { text: "NEXT", onClick: () => this.skipOne(1) }
      ]

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
                    tableData={products}
                    tableShopping
                    customCellClasses={[
                      classes.tdName,
                      classes.tdNumber
                    ]}
                    customClassesForCells={[1, 2]}
                  />
                </GridItem>
              </GridContainer>                            
              <GridContainer>
                <GridItem xs={12} sm={6}>
                </GridItem>
                <GridItem xs={12} sm={6} className={classes.right}>
                  <Pagination
                    pages={pageNations}
                    color="info"
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
        workingForId    : state.user.workingForId,
        products: state.b2bshop.products
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserData : Actions.getUserData,
        getB2BShopProducts : Actions.getB2BShopProducts
    }, dispatch);
}

export default withStyles(productsStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(B2BShop)));
