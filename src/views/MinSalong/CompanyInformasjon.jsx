/**
 * Description: Dashboard view
 * Date: 12/21/2018
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import * as Validator from "./../../validator";

import salongInformasjonStyle from "assets/jss/material-dashboard-pro-react/views/salongInformasjonStyle.jsx";

class CompanyInformasjon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {      
            name: "",
            nameState: "",
            address: "",
            addressState: "",
            zip: "",
            zipState: "",
            city: "",
            cityState: "",
            phone: "",
            phoneState: "",
            email: "",
            emailState: "",
            network: "",
            networkState: "",
            parkCheck: false,
            accessCheck: false,
            description: ""
        }
    }

    componentWillMount() {
        this.props.getUserData();
    }

    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "name":
                this.setState({
                    name: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "address":
                this.setState({
                    address: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "zip":
                this.setState({
                    zip: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "city":
                this.setState({
                    city: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyLength(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "phone":
                if(this.state.phone.length === 0) {
                    this.setState({
                        phone: "+46" + event.target.value
                    })
                } else {
                    this.setState({
                        phone: event.target.value
                    })
                }
                if (Validator.verifyPhone(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if(Validator.verifyPhone(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "email":
                this.setState({
                    email: event.target.value
                })
                if (Validator.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if(Validator.verifyEmail(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "network":
                this.setState({
                    network: event.target.value
                })
                if (Validator.verifyUrl(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyUrl(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    toggleCheck(event, stateName) {
        this.setState({ [stateName]: event.target.checked });
    }

    canSubmit() {
        if(this.state.nameState === "" || this.state.nameState === "error" || 
            this.state.addressState === "" || this.state.addressState === "error" ||
            this.state.zipState === "" || this.state.zipState === "error" ||
            this.state.cityState === "" || this.state.cityState === "error" ||
            this.state.phoneState === "" || this.state.phoneState === "error" ||
            this.state.emailState === "" || this.state.emailState === "error" ||
            this.state.networkState === "" || this.state.networkState === "error") {
          return true
        } else {
          return false
        }
    }

    addInfo() {
        this.props.addInfo({
            workingForId: this.props.workingForId,
            salonData: {
                email: this.state.email,
                name: this.state.name,
                description: this.state.description,
                descriptionValidated: false,
                parking: "",
                website: this.state.network,
                address: this.state.address,
                post: this.state.zip,
                city: this.state.city,
                country: "Sweden"
            }
        })
    }

    render() {
        const { classes } = this.props;
        return (
        <Card>
            <CardHeader>            
                <div className={classes.cardHeader}>
                    <h3 className={classes.cardTitle}>Company Informasjon</h3>
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <GridContainer>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                success={this.state.memberIdState === "success"}
                                error={this.state.memberIdState === "error"}
                                labelText="Member Id *"
                                id="name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.memberIdState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "memberId", "memberId", 0),
                                    value: this.state.memberId,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                success={this.state.nameState === "success"}
                                error={this.state.nameState === "error"}
                                labelText="Legal Name *"
                                id="name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.nameState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "name", "name", 0),
                                    value: this.state.name,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                success={this.state.orgNoState === "success"}
                                error={this.state.addressState === "error"}
                                labelText="Org No *"
                                id="org-no"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.orgNoState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "orgNo", "orgNo", 0),
                                    value: this.state.orgNo,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.emailState === "success"}
                                error={this.state.emailState === "error"}
                                labelText="Email *"
                                id="email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.emailState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "email", "email", 0),
                                    value: this.state.email,
                                    type: "email"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.phoneState === "success"}
                                error={this.state.phoneState === "error"}
                                labelText="Phone *"
                                id="phone"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.phoneState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "phone", "phone"),
                                    value: this.state.phone,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>                          
                        <GridItem xs={12} sm={12} md={6}>                      
                            <CustomInput
                                success={this.state.addressCOState === "success"}
                                error={this.state.addressCOState === "error"}
                                labelText="AddressCO *"
                                id="addressCO"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                        this.state.addressCOState === "error" ? (
                                        <InputAdornment position="end">
                                            <Warning className={classes.danger} />
                                        </InputAdornment>
                                        ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "addressCO", "addressCO", 0),
                                    value: this.state.addressCO,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>                      
                            <CustomInput
                                success={this.state.addressState === "success"}
                                error={this.state.addressState === "error"}
                                labelText="Address *"
                                id="address"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                        this.state.addressState === "error" ? (
                                        <InputAdornment position="end">
                                            <Warning className={classes.danger} />
                                        </InputAdornment>
                                        ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "address", "address", 0),
                                    value: this.state.address,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                success={this.state.cityState === "success"}
                                error={this.state.cityState === "error"}
                                labelText="City *"
                                id="city"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.cityState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "city", "city", 0),
                                    value: this.state.city,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                success={this.state.countryState === "success"}
                                error={this.state.countryState === "error"}
                                labelText="Country *"
                                id="country"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.countryState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "country", "country", 0),
                                    value: this.state.country,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                success={this.state.zipState === "success"}
                                error={this.state.zipState === "error"}
                                labelText="Post Nummer *"
                                id="zip"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.zipState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "zip", "zip", 0),
                                    value: this.state.zip,
                                    type: "number"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12}>
                            <div className={classes.cardHeader}>
                                <h3 className={classes.cardTitle}>Company Economy</h3>
                            </div>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>                          
                        <GridItem xs={12} sm={12} md={6}>                      
                            <CustomInput
                                success={this.state.billingCOState === "success"}
                                error={this.state.billingCOState === "error"}
                                labelText="BillingCO *"
                                id="billingCO"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                        this.state.billingCOState === "error" ? (
                                        <InputAdornment position="end">
                                            <Warning className={classes.danger} />
                                        </InputAdornment>
                                        ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "billingCO", "billingCO", 0),
                                    value: this.state.billingCO,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>                      
                            <CustomInput
                                success={this.state.billingState === "success"}
                                error={this.state.billingState === "error"}
                                labelText="Billing *"
                                id="billing"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                        this.state.billingState === "error" ? (
                                        <InputAdornment position="end">
                                            <Warning className={classes.danger} />
                                        </InputAdornment>
                                        ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "billing", "billing", 0),
                                    value: this.state.billing,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                success={this.state.billingCityState === "success"}
                                error={this.state.billingCityState === "error"}
                                labelText="Billing City *"
                                id="billing-city"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.billingCityState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "billingCity", "billingCity", 0),
                                    value: this.state.billingCity,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                success={this.state.billingCountryState === "success"}
                                error={this.state.billingCountryState === "error"}
                                labelText="Billing Country *"
                                id="billing-country"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.billingCountryState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "billingCountry", "billingCountry", 0),
                                    value: this.state.billingCountry,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                success={this.state.billingZipState === "success"}
                                error={this.state.billingZipState === "error"}
                                labelText="Billing Post Nummer *"
                                id="billing-zip"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.billingZipState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "billingZip", "billingZip", 0),
                                    value: this.state.billingZip,
                                    type: "number"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.billingEmailState === "success"}
                                error={this.state.billingEmailState === "error"}
                                labelText="Billing Email *"
                                id="billing-email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.billingEmailState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "billingEmail", "billingEmail", 0),
                                    value: this.state.billingEmail,
                                    type: "email"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.accountNoState === "success"}
                                error={this.state.accountNoState === "error"}
                                labelText="Account No *"
                                id="account-no"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.accountNoState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "accountNo", "accountNo"),
                                    value: this.state.accountNo,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.bankgiroNoState === "success"}
                                error={this.state.bankgiroNoState === "error"}
                                labelText="Bankgiro No *"
                                id="bankgiro-no"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.bankgiroNoState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "bankgiroNo", "bankgiroNo", 0),
                                    value: this.state.bankgiroNo,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.plusgiroNo === "success"}
                                error={this.state.plusgiroNo === "error"}
                                labelText="Plusgiro No *"
                                id="plusgiro-no"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.plusgiroNo === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "accountNo", "accountNo"),
                                    value: this.state.accountNo,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer justify="flex-end" alignItems="flex-end">
                        <GridItem xs={12} sm={12} md={6}>                    
                            <Button color="info" className={classes.submit} disabled={this.canSubmit()} onClick={this.addInfo.bind(this)}>LAGRE</Button>
                        </GridItem>
                    </GridContainer>
                </form>
            </CardBody>
        </Card>
        );
    }
}

CompanyInformasjon.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId
    }
  }
  
  function mapDispatchToProps(dispatch) {
      return bindActionCreators({          
        getUserData : Actions.getUserData,
        addInfo: Actions.addInfo
      }, dispatch);
  }
  
  export default withStyles(salongInformasjonStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyInformasjon)));
