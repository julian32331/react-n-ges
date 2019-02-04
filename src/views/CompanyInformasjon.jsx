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

import * as Validator from "../validator";

import salongInformasjonStyle from "assets/jss/material-dashboard-pro-react/views/salongInformasjonStyle.jsx";

class CompanyInformasjon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {      
            memberId: "",
            memberIdState: "",
            name: "",
            nameState: "",
            orgNo: "",
            orgNoState: "",
            email: "",
            emailState: "",
            phone: "",
            phoneState: "",
            addressCO: "",
            addressCOState: "",
            address: "",
            addressState: "",
            city: "",
            cityState: "",
            country: "",
            countryState: "",
            zip: "",
            zipState: "",
            // billingCO: "",
            // billingCOState: "",
            // billing: "",
            // billingState: "",
            // billingCity: "",
            // billingCityState: "",
            // billingCountry: "",
            // billingCountryState: "",
            billingEmail: "",
            billingEmailState: "",
            accountNo: "",
            accountNoState: "",
            bankgiroNo: "",
            bankgiroNoState: "",
            plusgiroNo: "",
            plusgiroNoState: "",
            isEdit: false
        }
    }
    
    componentWillMount() {
        this.props.getUserData();
        setTimeout(() => {
            this.getCompanyInfo(this.props.workingForId);
        }, 100);
    }

    getCompanyInfo(id) {
        this.props.getCompanyInfo({
            workingForId: id
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.workingForId !== nextProps.workingForId) {
            this.getCompanyInfo(nextProps.workingForId);
        }

        if(nextProps.info) {
            console.log('nextProps: ', nextProps.info.legalName);
            this.setState({
                memberId: nextProps.info.memberId? nextProps.info.memberId : "",
                memberIdState: nextProps.info.memberId? "success" : "",
                name: nextProps.info.legalName? nextProps.info.legalName : "",
                nameState: nextProps.info.legalName? "success" : "",
                orgNo: nextProps.info.orgNo? nextProps.info.orgNo : "",
                orgNoState: nextProps.info.orgNo? "success" : "",
                email: nextProps.info.email? nextProps.info.email : "",
                emailState: nextProps.info.email? "success" : "",
                phone: nextProps.info.mobile? nextProps.info.mobile : "",
                phoneState: nextProps.info.mobile? "success" : "",
                addressCO: nextProps.info.addressCO? nextProps.info.addressCO : "",
                addressCOState: nextProps.info.addressCO? "success" : "",
                address: nextProps.info.address? nextProps.info.address : "",
                addressState: nextProps.info.address? "success" : "",
                city: nextProps.info.city? nextProps.info.city : "",
                cityState: nextProps.info.city? "success" : "",
                country: nextProps.info.country? nextProps.info.country : "",
                countryState: nextProps.info.country? "success" : "",
                zip: nextProps.info.post? nextProps.info.post : "",
                zipState: nextProps.info.post? "success" : "",
                billingEmail: nextProps.info.CompanyEconomy? (nextProps.info.CompanyEconomy.billingEmail? nextProps.info.CompanyEconomy.billingEmail : "") : "",
                billingEmailState: nextProps.info.CompanyEconomy? (nextProps.info.CompanyEconomy.billingEmail? "success" : "") : "",
                accountNo: nextProps.info.CompanyEconomy? (nextProps.info.CompanyEconomy.accountNo? nextProps.info.CompanyEconomy.accountNo : "") : "",
                accountNoState: nextProps.info.CompanyEconomy? (nextProps.info.CompanyEconomy.accountNo? "success" : "") : "",
                bankgiroNo: nextProps.info.CompanyEconomy? (nextProps.info.CompanyEconomy.bankgiroNo? nextProps.info.CompanyEconomy.bankgiroNo : "") : "",
                bankgiroNoState: nextProps.info.CompanyEconomy? (nextProps.info.CompanyEconomy.bankgiroNo? "success" : "") : "",
                plusgiroNo: nextProps.info.CompanyEconomy? (nextProps.info.CompanyEconomy.plusgiroNo? nextProps.info.CompanyEconomy.plusgiroNo : "") : "",
                plusgiroNoState: nextProps.info.CompanyEconomy? (nextProps.info.CompanyEconomy.plusgiroNo? "success" : "") : "",
            })
        }
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
                this.setState({ 
                    [stateName]: event.target.value,
                    [stateName + "State"]: Validator.verifyLength(event.target.value, stateNameEqualTo)? "success" : "error"
                });
                break;  
            // case "phone":
            //     if(this.state.phone.length === 0) {
            //         this.setState({
            //             phone: "+46" + event.target.value
            //         })
            //     } else {
            //         this.setState({
            //             phone: event.target.value
            //         })
            //     }
            //     if (Validator.verifyPhone(event.target.value)) {
            //         this.setState({ [stateName + "State"]: "success" });
            //     } else if(Validator.verifyPhone(event.target.value) === "") {
            //         this.setState({ [stateName + "State"]: "" });
            //     } else {
            //         this.setState({ [stateName + "State"]: "error" });
            //     }
            //     break;
            case "email":
            case "billingEmail":
                this.setState({
                    [stateName]: event.target.value
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
            case "memberId":  
            case "orgNo":   
            case "addressCO":  
            case "country":  
            case "accountNo":
            case "bankgiroNo":  
            case "plusgiroNo":         
                this.setState({ 
                    [stateName]: event.target.value,
                    [stateName + "State"]: Validator.verifyLength(event.target.value, stateNameEqualTo)? "success" : "error"
                });
                break;
            default:
                break;
        }
    }

    enableEdit() {
        this.setState({
            isEdit: true
        })
    }

    cancelEdit() {
        this.setState({
            memberId: this.props.info.memberId? this.props.info.memberId : "",
            memberIdState: this.props.info.memberId? "success" : "",
            name: this.props.info.legalName? this.props.info.legalName : "",
            nameState: this.props.info.legalName? "success" : "",
            orgNo: this.props.info.orgNo? this.props.info.orgNo : "",
            orgNoState: this.props.info.orgNo? "success" : "",
            email: this.props.info.email? this.props.info.email : "",
            emailState: this.props.info.email? "success" : "",
            phone: this.props.info.mobile? this.props.info.mobile : "",
            phoneState: this.props.info.mobile? "success" : "",
            addressCO: this.props.info.addressCO? this.props.info.addressCO : "",
            addressCOState: this.props.info.addressCO? "success" : "",
            address: this.props.info.address? this.props.info.address : "",
            addressState: this.props.info.address? "success" : "",
            city: this.props.info.city? this.props.info.city : "",
            cityState: this.props.info.city? "success" : "",
            country: this.props.info.country? this.props.info.country : "",
            countryState: this.props.info.country? "success" : "",
            zip: this.props.info.post? this.props.info.post : "",
            zipState: this.props.info.post? "success" : "",
            billingEmail: this.props.info.CompanyEconomy? this.props.info.CompanyEconomy.billingEmail : "",
            billingEmailState: this.props.info.CompanyEconomy? "success" : "",
            accountNo: this.props.info.CompanyEconomy? this.props.info.CompanyEconomy.accountNo : "",
            accountNoState: this.props.info.CompanyEconomy? "success" : "",
            bankgiroNo: this.props.info.CompanyEconomy? this.props.info.CompanyEconomy.bankgiroNo : "",
            bankgiroNoState: this.props.info.CompanyEconomy? "success" : "",
            plusgiroNo: this.props.info.CompanyEconomy? this.props.info.CompanyEconomy.plusgiroNo : "",
            plusgiroNoState: this.props.info.CompanyEconomy? "success" : "",
            isEdit: false
        });
    }

    canSubmit() {
        if(this.state.memberIdState === "success" &&
            this.state.nameState === "success" &&
            this.state.orgNoState === "success" &&
            this.state.emailState === "success" &&
            this.state.phoneState === "success" &&
            this.state.addressCOState === "success" &&
            this.state.addressState === "success" &&
            this.state.cityState === "success" &&
            this.state.countryState === "success" &&
            this.state.zipState === "success" &&
            this.state.billingEmailState === "success" &&
            this.state.accountNoState === "success" &&
            this.state.bankgiroNoState === "success" &&
            this.state.plusgiroNoState === "success") {
            return false;
        } else {
            return true
        }
    }

    updateCompanyInfo() {
        this.props.updateCompanyInfo({
            workingForId: this.props.workingForId,
            companyData: {
                memberId: this.state.memberId,
                legalName: this.state.name,
                orgNo: this.state.orgNo,
                email: this.state.email,
                mobile: this.state.phone,
                addressCO: this.state.addressCO,
                address: this.state.address,
                city: this.state.city,
                country: this.state.country,
                post: this.state.zip,
            },
            companyEconomyData: {                
                billingEmail: this.state.billingEmail,
                accountNo: this.state.accountNo,
                bankgiroNo: this.state.bankgiroNo,
                plusgiroNo: this.state.plusgiroNo
            }
        });
        this.setState({
            isEdit: false
        })
    }

    render() {
        console.log('name: ', this.state.name)
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "memberId", "memberId", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "name", "name", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "orgNo", "orgNo", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "email", "email", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "phone", "phone", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "addressCO", "addressCO", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "address", "address", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "city", "city", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "country", "country", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "zip", "zip", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "billingEmail", "billingEmail", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "accountNo", "accountNo", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "bankgiroNo", "bankgiroNo", 1),
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
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "plusgiroNo", "plusgiroNo", 1),
                                    value: this.state.plusgiroNo,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer justify="flex-end" alignItems="flex-end">
                        {/* <GridItem xs={12} sm={12} md={6}>                    
                            <Button color="info" className={classes.submit} >LAGRE</Button>
                        </GridItem> */}                   
                        {
                            this.state.isEdit? (                      
                                <GridItem xs={12} sm={12} md={6}>                    
                                    <Button color="info" size="sm" className={classes.submit} disabled={this.canSubmit()} onClick={this.updateCompanyInfo.bind(this)}>LAGRE</Button>
                                    <Button color="danger" size="sm" className={classes.submit} onClick={this.cancelEdit.bind(this)}>Cancel</Button>
                                </GridItem>                                
                            ) : (
                                <GridItem xs={12} sm={12} md={6}>                    
                                    <Button color="info" size="sm" className={classes.submit} onClick={this.enableEdit.bind(this)}>Edit</Button>
                                </GridItem> 
                            )
                        } 
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
        workingForId    : state.user.workingForId,
        info: state.companyInfo.info
    }
  }
  
  function mapDispatchToProps(dispatch) {
      return bindActionCreators({          
        getUserData : Actions.getUserData,
        getCompanyInfo: Actions.getCompanyInfo,        
        updateCompanyInfo: Actions.updateCompanyInfo
      }, dispatch);
  }
  
  export default withStyles(salongInformasjonStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyInformasjon)));
