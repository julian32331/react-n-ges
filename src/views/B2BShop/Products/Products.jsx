import React from "react";

import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

// material-ui icons
import MoreVert from '@material-ui/icons/MoreVert';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Pagination from "components/Pagination/Pagination.jsx";

import productsStyle from "assets/jss/material-dashboard-pro-react/views/b2bshop/productsStyle.jsx";
import noImage from "assets/img/no_image.jpg";
import Detail from "./modals/Detail";

class B2BShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      cart: [],
      pageOffset: 0,
      activedPageNo: 1,
      isVisibleDetail: false,
      detailData: null,
      badge: 0
    };
    this.products = [];
  }

  componentDidMount() {
    this.props.getUser().then(() => {
      this.props.featuredProduct({
        workingForId: this.props.workingForId
      });
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products) {
      this.products = nextProps.products;
      for (let i = 0; i < this.products.length; i++) {
        this.initStateForQty(this.products[i].articleNo);
      }
    }
    if(nextProps.cart) this.setState({cart: nextProps.cart})
  }
  initStateForQty(index) {
    this.setState({
      ["qty_" + index]: 1
    })
  }

  searchHandler = (event) => {
    event.preventDefault();
    if(this.state.search)
      this.props.searchProduct({
        workingForId: this.props.workingForId,
        searchTerm: this.state.search
      })    
    else
      this.props.featuredProduct({
        workingForId: this.props.workingForId
      });
  };

  createCategory = (categories) => {
    const { classes } = this.props;
    return categories.map((category, key) => {
      var child;
      if(category.hierarchy_level === 2) {
        child = classes.child_1;
      } else if(category.hierarchy_level === 3) {
        child = classes.child_2;
      } else if(category.hierarchy_level === 4) {
        child = classes.child_3;
      }
      if(category.collapse) {
        var st = {};
        st[category["name"]] = !this.state[category.name];
        return (
          <div key={key}>
            <ListItem divider={true} classes={{gutters: child}} className={this.state.actived_cat === category.name? classes.actived_cat : ''} onMouseEnter={() => this.setState(st)}>
              <ListItemText primary={category.name} onClick={() => this.categoryHandler(category.id)} />
              {this.state[category.name] ? <ExpandLess /> : <ExpandMore />}  
            </ListItem>
            <Collapse in={this.state[category.name]} timeout="auto" unmountOnExit>
              <List component="div">
                {this.createCategory(category.children)}
              </List>
            </Collapse>
          </div>
        )
      }
      return (
        <ListItem button key={key} classes={{gutters: child}} className={this.state.actived_cat === category.name? classes.actived_cat : ''}>
          <ListItemText primary={category.name} onClick={() => this.categoryHandler(category.id)} />                    
        </ListItem>
      )
    }) 
  }

  categoryHandler = (cat) => {
    this.setState({actived_cat: cat});
    this.props.categoryProduct({
      workingForId: this.props.workingForId,
      categoryId: cat
    })
  }

  product_image = src => {    
    const { classes } = this.props;
    return (
      <div className={classes.imgContainer}>
        <img src={src} alt="..." className={classes.img} />
      </div>
    )
  }

  product_name = (product) => {
    const { classes } = this.props;
    return (
      <span>
        <a className={classes.tdNameAnchor} onClick={()=> this.setState({ isVisibleDetail: true, detailData: product })}>
          {product.name}
        </a>
        <br />
        <small className={classes.tdNameSmall}>
          {product.articleNo}
        </small>
      </span>
    )
  }

  product_price_qty = (product) => {
    const { classes } = this.props;
    return (
      <span>
        <h4 className={classes.price}><small className={classes.tdNumberSmall}>kr</small> {product.price}</h4>
        <div>
          <TextField
            id="outlined-bare"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            type="number"
            inputProps={{
              className: classes.qty,
              onChange: (event)=> event.target.value >= 1 && this.setState({["qty_" + product.articleNo]: event.target.value})
            }}
            value={this.state["qty_" + product.articleNo]? this.state["qty_" + product.articleNo] : 1}
          />
          <Button color="info" round size="sm" className={classes.marginRight} onClick={() => this.addCart(product)}>
            Add
          </Button>
        </div>
      </span>
    )
  }
  addCart = (product, qty) => {
    let cart = this.state.cart? this.state.cart : [];
    let total_product = this.state.badge;
    cart.map((item, key) => {
      if(item.product.articleNo === product.articleNo) {
        total_product -= Number(item['quantityOrdered']);
        cart.splice(key, 1)
      }
    })

    let temp = {};
    temp['product'] = product;
    temp['quantityOrdered'] = qty? qty : this.state["qty_" + product.articleNo];

    
    qty? total_product += Number(qty) : total_product += Number(this.state["qty_" + product.articleNo]);

    cart.push(temp);
    if(qty) {
      this.setState({
        cart: cart,
        ["qty_" + product.articleNo]: qty,
        badge: total_product
      });
    } else {
      this.setState({
        cart: cart,
        badge: total_product
      });
    }
  }
  goCart = () => {
    this.props.setCart(this.state.cart);
    this.props.history.push('/b2bshop/cart');
  }

  // Pagination actions
  changePagination(param) {
    let totalPages = this.products.length % 10 > 0 ? Math.floor(this.products.length / 10 + 1) : this.products.length / 10;
    if (param === 1) {
      if ((this.state.pageOffset + 1) * 5 < totalPages)
        this.setState(prevState => ({
          pageOffset: prevState.pageOffset + 1,
          activedPageNo: (prevState.pageOffset + 1) * 5 + 1
        }));
    } else {
      if (this.state.pageOffset - 1 >= 0)
        this.setState(prevState => ({
          pageOffset: prevState.pageOffset - 1,
          activedPageNo: (prevState.pageOffset - 1) * 5 + 5
        }));
    }
  }
  skipOne(param) {
    let totalPages = this.products.length % 10 > 0 ? Math.floor(this.products.length / 10 + 1) : this.products.length / 10;
    if (param === 1) {
      if (this.state.activedPageNo < totalPages) {
        if (this.state.activedPageNo + 1 > this.state.pageOffset * 5 + 5) {
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
      if (this.state.activedPageNo - 1 > 0) {
        if (this.state.activedPageNo - 1 <= this.state.pageOffset * 5) {
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
    const { classes, categories } = this.props;
    const { activedPageNo } = this.state;

    let products = [];
    this.products.map((product, index) => {
      let temp = [];

      if (index >= (activedPageNo - 1) * 10 && index < activedPageNo * 10) {
        temp.push(this.product_image(product.imageURL !== ""? product.imageURL : noImage));
        temp.push(this.product_name(product));
        temp.push(this.product_price_qty(product));
        temp.push(
          <Button color="info" simple style={{padding: '0px',}} onClick={() => this.setState({isVisibleDetail: true, detailData: product})}>
            <MoreVert />
          </Button>
        )

        products.push(temp);
      }
    })

    let pageNations = [];
    let totalPages = this.products.length % 10 > 0 ? Math.floor(this.products.length / 10 + 1) : this.products.length / 10;

    let temp = [];
    if (this.state.pageOffset !== 0) temp.push({ text: "<<", onClick: () => this.changePagination(-1) });

    if ((this.state.pageOffset + 1) * 5 < totalPages) {
      for (let i = 1; i <= 5; i++) {
        temp.push(
          { text: this.state.pageOffset * 5 + i, active: this.state.activedPageNo === this.state.pageOffset * 5 + i, onClick: () => this.clickNumber(this.state.pageOffset * 5 + i) },
        )
      }
    } else {
      for (let i = 1; i <= totalPages - this.state.pageOffset * 5; i++) {
        temp.push(
          { text: this.state.pageOffset * 5 + i, active: this.state.activedPageNo === this.state.pageOffset * 5 + i, onClick: () => this.clickNumber(this.state.pageOffset * 5 + i) },
        )
      }
    }

    if (this.state.pageOffset !== totalPages && totalPages > 5) temp.push({ text: ">>", onClick: () => this.changePagination(1) });

    if (totalPages > 0)
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
                    <h3 className={classes.cardTitle}>Produkter</h3>
                  </GridItem>
                  <GridItem xs={12} sm={6} className={classes.text_right}>
                    {
                      this.state.badge > 0 &&
                        <div className={classes.badge}>{this.state.badge}</div>
                    }                    
                    <Button
                      justIcon
                      round
                      color="info"
                      className={classes.marginRight}
                      onClick={() => this.goCart()}
                      disabled={this.state.cart.length === 0}
                    >
                      <AddShoppingCart className={classes.icons} />
                    </Button>

                    {/* <Button
                      color="info"
                      className={classes.marginRight}
                      onClick={() => this.setState({isVisibleDetail: true})}
                    >
                      test
                    </Button> */}
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
                  <form onSubmit={this.searchHandler}>
                    <CustomInput
                      id="search"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "search",
                        onChange: event =>
                          this.setState({ search: event.target.value }),
                        value: this.state.search
                      }}
                    />
                  </form>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <List
                    component="nav"
                    className={classes.root}
                  >
                    <div className={classes.cat_container}>
                      {this.createCategory(categories)}
                    </div>
                  </List>
                </GridItem>
                <GridItem xs={12} sm={9}>
                  {
                    this.props.loading? (
                      <div className={classes.center}>
                        <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                      </div>
                    ):
                      this.props.products.length > 0? (
                        <Table
                          tableData={products}
                          tableShopping
                          customCellClasses={[
                            classes.tdName,
                            classes.tdNumber,
                            classes.right
                          ]}
                          customClassesForCells={[1, 2, 3]}
                        />
                      ) : (
                        <h3 className={classes.center}>No products</h3>
                      )
                  }
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

        <Detail 
          onOpen={this.state.isVisibleDetail}
          onClose={() => this.setState({isVisibleDetail: false})}
          addCart={this.addCart}
          data={this.state.detailData}
        />
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    workingForId: state.auth.workingForId,
    loading     : state.b2b_shop.product.loading,
    error       : state.b2b_shop.product.error,
    categories  : state.b2b_shop.product.categories,
    products    : state.b2b_shop.product.products,
    cart        : state.b2b_shop.cart.cart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser         : Actions.getUser,
    featuredProduct : Actions.featuredProduct,
    searchProduct   : Actions.searchProduct,
    categoryProduct : Actions.categoryProduct,
    setCart         : Actions.setCart
}, dispatch);
}

export default withStyles(productsStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(B2BShop)));
