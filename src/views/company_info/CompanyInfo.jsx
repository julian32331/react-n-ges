/**
 * Description: Company Info page
 * Date: 4/26/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import * as Validator from "utils/validator";

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";

class CompanyInfo extends React.Component {
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
        this.props.getUser().then(() => {
            this.getCompanyInfo(this.props.workingForId);
        })
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
                billingEmail: nextProps.info.CompanyEconomy && nextProps.info.CompanyEconomy.billingEmail? nextProps.info.CompanyEconomy.billingEmail : "",
                billingEmailState: nextProps.info.CompanyEconomy && nextProps.info.CompanyEconomy.billingEmail? "success" : "",
                accountNo: nextProps.info.CompanyEconomy && nextProps.info.CompanyEconomy.accountNo? nextProps.info.CompanyEconomy.accountNo : "",
                accountNoState: nextProps.info.CompanyEconomy && nextProps.info.CompanyEconomy.accountNo? "success" : "",
                bankgiroNo: nextProps.info.CompanyEconomy && nextProps.info.CompanyEconomy.bankgiroNo? nextProps.info.CompanyEconomy.bankgiroNo : "",
                bankgiroNoState: nextProps.info.CompanyEconomy && nextProps.info.CompanyEconomy.bankgiroNo? "success" : "",
                plusgiroNo: nextProps.info.CompanyEconomy && nextProps.info.CompanyEconomy.plusgiroNo? nextProps.info.CompanyEconomy.plusgiroNo : "",
                plusgiroNoState: nextProps.info.CompanyEconomy && nextProps.info.CompanyEconomy.plusgiroNo? "success" : ""
            })
        }
    }

    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "name":
            case "address":
            case "zip":
            case "city":
            case "memberId":  
            case "orgNo":   
            case "country":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "addressCO":  
            case "accountNo":
            case "bankgiroNo":  
            case "plusgiroNo": 
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break;
            case "phone":
                this.setState({
                    phone: event.target.value
                })
                if (Validator.verifyPhone(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "email":
            case "billingEmail":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
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
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
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
            billingEmail: this.props.info.CompanyEconomy && this.props.info.CompanyEconomy.billingEmail? this.props.info.CompanyEconomy.billingEmail : "",
            billingEmailState: this.props.info.CompanyEconomy && this.props.info.CompanyEconomy.billingEmail? "success" : "",
            accountNo: this.props.info.CompanyEconomy && this.props.info.CompanyEconomy.accountNo? this.props.info.CompanyEconomy.accountNo : "",
            accountNoState: this.props.info.CompanyEconomy && this.props.info.CompanyEconomy.accountNo? "success" : "",
            bankgiroNo: this.props.info.CompanyEconomy && this.props.info.CompanyEconomy.bankgiroNo? this.props.info.CompanyEconomy.bankgiroNo : "",
            bankgiroNoState: this.props.info.CompanyEconomy && this.props.info.CompanyEconomy.bankgiroNo? "success" : "",
            plusgiroNo: this.props.info.CompanyEconomy && this.props.info.CompanyEconomy.plusgiroNo? this.props.info.CompanyEconomy.plusgiroNo : "",
            plusgiroNoState: this.props.info.CompanyEconomy && this.props.info.CompanyEconomy.plusgiroNo? "success" : "",
            isEdit: false
        });
    }

    canSubmit() {
        if(this.state.emailState === "success" &&
            this.state.phoneState === "success" &&
            this.state.addressState === "success" &&
            this.state.cityState === "success" &&
            this.state.countryState === "success" &&
            this.state.zipState === "success" &&
            this.state.billingEmailState === "success") {
            return true;
        } else {
            return false
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
        const { classes, loading } = this.props;
        return (
        <Card classes={{card: classes.card}}>            
            {
                loading? (
                    <div className={classes.loading_container}>
                        <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                    </div>
                ) : (
                    <div>                        
                        <CardHeader>            
                            <div className={classes.cardHeader}>
                                <h3 className={classes.cardTitle}>Företagsinformation</h3>
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
                                                disabled: true,
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
                                            labelText="Legalt namn *"
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
                                                disabled: true,
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
                                            labelText="Org.nr. *"
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
                                                disabled: true,
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
                                            labelText="E-post *"
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
                                            labelText="Telefonnummer *"
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
                                            labelText="C/O"
                                            id="addressCO"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
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
                                            labelText="Adress *"
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
                                            labelText="Postort *"
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
                                            labelText="Land *"
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
                                            labelText="Postnummer *"
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
                                            <h3 className={classes.cardTitle}>Ekonomi</h3>
                                        </div>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            success={this.state.billingEmailState === "success"}
                                            error={this.state.billingEmailState === "error"}
                                            labelText="E-post för fakturor *"
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
                                            labelText="Kontonummer"
                                            id="account-no"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
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
                                            labelText="Bankgiro"
                                            id="bankgiro-no"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
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
                                            success={this.state.plusgiroNoState === "success"}
                                            error={this.state.plusgiroNoState === "error"}
                                            labelText="Postgiro"
                                            id="plusgiro-no"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: !this.state.isEdit,
                                                onChange: event =>
                                                    this.change(event, "plusgiroNo", "plusgiroNo", 1),
                                                value: this.state.plusgiroNo,
                                                type: "text"
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify="flex-end">                 
                                    {
                                        this.state.isEdit? (                      
                                            <GridItem xs={12} sm={12} md={6} className={classes.right}>                    
                                                <Button color="danger" size="sm" className={classes.mr_8} onClick={this.cancelEdit.bind(this)}>Cancel</Button>
                                                <Button color="info" size="sm" disabled={!this.canSubmit()} onClick={this.updateCompanyInfo.bind(this)}>LAGRE</Button>                                    
                                            </GridItem>                                
                                        ) : (
                                            <GridItem xs={12} sm={12} md={6} className={classes.right}>                    
                                                <Button color="info" size="sm" onClick={this.enableEdit.bind(this)}>Edit</Button>
                                            </GridItem> 
                                        )
                                    } 
                                </GridContainer> 
                            </form>
                        </CardBody>
                    </div>
                )    
            }
        </Card>
        );
    }
}

CompanyInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId: state.auth.workingForId,
        loading     : state.company.loading,
        info        : state.company.info
    }
  }
  
  function mapDispatchToProps(dispatch) {
      return bindActionCreators({
        getUser             : Actions.getUser,
        getCompanyInfo      : Actions.getCompanyInfo,        
        updateCompanyInfo   : Actions.updateCompanyInfo
      }, dispatch);
  }
  
export default withStyles(commonStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyInfo)));
