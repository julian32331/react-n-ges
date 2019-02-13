import React from "react";

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
                        <h3 className={classes.cardTitle}>Producs</h3>
                    </GridItem>
                </GridContainer>
              </div>
            </CardHeader>
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
                  "COLOR",
                  "SIZE",
                  "PRICE",
                  "QTY",
                  "AMOUNT",
                  ""
                ]}
                tableData={[
                  [
                    <div className={classes.imgContainer}>
                      <img src={product1} alt="..." className={classes.img} />
                    </div>,
                    <span>
                      <a href="#jacket" className={classes.tdNameAnchor}>
                        Spring Jacket
                      </a>
                      <br />
                      <small className={classes.tdNameSmall}>
                        by Dolce&amp;Gabbana
                      </small>
                    </span>,
                    "Red",
                    "M",
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 549
                    </span>,
                    <div className={classes.qty}>
                      <CustomInput
                        id="qty"
                        inputProps={{
                          type: "number",
                        }}
                      />
                    </div>,
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 549
                    </span>,
                    <Button simple className={classes.actionButton}>
                      <Close className={classes.icon} />
                    </Button>
                  ],
                  [
                    <div className={classes.imgContainer}>
                      <img src={product2} alt="..." className={classes.img} />
                    </div>,
                    <span>
                      <a href="#jacket" className={classes.tdNameAnchor}>
                        Short Pants{" "}
                      </a>
                      <br />
                      <small className={classes.tdNameSmall}>by Pucci</small>
                    </span>,
                    "Purple",
                    "M",
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 499
                    </span>,
                    <div className={classes.qty}>
                      <CustomInput
                        id="qty"
                        inputProps={{
                          type: "number",
                        }}
                      />
                    </div>,
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 998
                    </span>,
                    <Button simple className={classes.actionButton}>
                      <Close className={classes.icon} />
                    </Button>
                  ],
                  [
                    <div className={classes.imgContainer}>
                      <img src={product3} alt="..." className={classes.img} />
                    </div>,
                    <span>
                      <a href="#jacket" className={classes.tdNameAnchor}>
                        Pencil Skirt
                      </a>
                      <br />
                      <small className={classes.tdNameSmall}>
                        by Valentino
                      </small>
                    </span>,
                    "White",
                    "XL",
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 799
                    </span>,
                    <div className={classes.qty}>
                      <CustomInput
                        id="qty"
                        inputProps={{
                          type: "number",
                        }}
                      />
                    </div>,
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 799
                    </span>,
                    <Button simple className={classes.actionButton}>
                      <Close className={classes.icon} />
                    </Button>
                  ],
                ]}
                tableShopping
                customHeadCellClasses={[
                  classes.center,
                  classes.description,
                  classes.description,
                  classes.right,
                  classes.right + " " + classes.pr_20,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                customCellClasses={[
                  classes.tdName,
                  classes.customFont,
                  classes.customFont,
                  classes.tdNumber,
                  classes.tdNumber,
                  classes.tdNumber
                ]}
                customClassesForCells={[1, 2, 3, 4, 5, 6]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(productsStyle)(B2BShop);
