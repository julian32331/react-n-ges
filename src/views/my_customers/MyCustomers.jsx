/**
 * Description: My Customers Page
 * Date: 7/15/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import Add from "@material-ui/icons/Add";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";

import myCustomersStyle from "assets/jss/material-dashboard-pro-react/views/myCustomers/myCustomersStyle";

class MyCustomers extends React.Component {

    constructor() {
        super();
        this.state = {
            search: ""
        };
        this.customers = [
            {firstname: "firstname1", lastname: "lastname1"},
            {firstname: "firstname2", lastname: "lastname1"},
            {firstname: "firstname3", lastname: "lastname1"},
            {firstname: "firstname4", lastname: "lastname1"},
            {firstname: "firstname5", lastname: "lastname1"}
        ];
        this.tempCustmors = this.customers;
    }

    componentWillMount() {
        this.props.getUser();
    }

    searchHandler(name, event) {
        this.setState({ [name]: event.target.value });
        this.search(event.target.value.toLowerCase());
    };
    search(value) {
        let temp = this.customers.filter( customer => {
          return customer.firstname.toLowerCase().indexOf(value) !== -1 || customer.lastname.toLowerCase().indexOf(value) !== -1
        });
    
        this.tempCustmors = temp;
    }

    render() {
        const { classes } = this.props;

        const details = () => {
            return (
                <Button color="info" simple size="sm" onClick={() => this.props.history.push('/customer-profile')}>
                    Details
                </Button>
            )
        }

        let customers = [];
        this.tempCustmors.map((customer, index) => {
            if (customer) {
                let temp = [];

                temp.push(index + 1);
                temp.push(customer.firstname);
                temp.push(customer.lastname);
                temp.push(details());

                customers.push(temp);
            }
        });

        return (
            <Card>
                <CardHeader className={classes.pb_0}>
                    <div className={classes.cardHeader}>
                        <GridContainer>
                            <GridItem xs={12} sm={6}>
                                <h3 className={classes.cardTitle}>My Customers</h3>
                            </GridItem>
                            <GridItem xs={12} sm={6} className={classes.text_right}>
                                <Button
                                    color="info"
                                    size="sm"
                                    // onClick={() => this.props.history.push('/customer-profile')}
                                >
                                    <Add /> Invite
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </div>
                </CardHeader>
                <CardBody className={classes.pt_0}>
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
                            "#",
                            "FirstName",
                            "LastName",
                            "Profile"
                        ]}
                        tableData={customers}
                        customCellClasses={[
                            classes.center + " " + classes.td,
                            classes.center + " " + classes.td,
                            classes.center + " " + classes.td,
                            classes.center + " " + classes.td
                        ]}
                        customClassesForCells={[0, 1, 2, 3]}
                        customHeadCellClasses={[
                            classes.center + " " + classes.th,
                            classes.center + " " + classes.th,
                            classes.center + " " + classes.th,
                            classes.center + " " + classes.th
                        ]}
                        customHeadClassesForCells={[0, 1, 2, 3]}
                    />
                </CardBody>
            </Card>
        );
    }
}

MyCustomers.propTypes = {
  classes: PropTypes.object.isRequired
};
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser             : Actions.getUser
    }, dispatch);
}

export default withStyles(myCustomersStyle)(connect(null, mapDispatchToProps)(MyCustomers));
