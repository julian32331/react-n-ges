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

class SalongInformasjon extends React.Component {
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
                    <h3 className={classes.cardTitle}>Salong Informasjon</h3>
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.nameState === "success"}
                                error={this.state.nameState === "error"}
                                labelText="Salongens navn *"
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
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.addressState === "success"}
                                error={this.state.addressState === "error"}
                                labelText="Addresse *"
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
                        <GridItem xs={12} sm={12} md={6}>
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
                                    onChange: event =>
                                        this.change(event, "zip", "zip", 0),
                                    value: this.state.zip,
                                    type: "number"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.cityState === "success"}
                                error={this.state.cityState === "error"}
                                labelText="By *"
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
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.phoneState === "success"}
                                error={this.state.phoneState === "error"}
                                labelText="Telefonummer *"
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
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.emailState === "success"}
                                error={this.state.emailState === "error"}
                                labelText="Epost *"
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
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                success={this.state.networkState === "success"}
                                error={this.state.networkState === "error"}
                                labelText="Nettadresse *"
                                id="network"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.networkState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "network", "network", 0),
                                    value: this.state.network,
                                    type: "url"
                                }}
                            />
                        </GridItem>
                        <GridItem sm={6} md={3}>                        
                            <div className={classes.checkboxAndRadio}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onClick={event =>
                                                this.toggleCheck(event, "parkCheck")
                                            }
                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                            icon={<Check className={classes.uncheckedIcon} />}
                                            classes={{
                                                checked: classes.checked,
                                                root: classes.checkRoot
                                            }}
                                            checked={this.state.parkCheck}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Har salongen parkering"
                                />
                            </div>
                        </GridItem>
                        <GridItem sm={6} md={3}>                        
                            <div className={classes.checkboxAndRadio}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onClick={event =>
                                                this.toggleCheck(event, "accessCheck")
                                            }
                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                            icon={<Check className={classes.uncheckedIcon} />}
                                            classes={{
                                                checked: classes.checked,
                                                root: classes.checkRoot
                                            }}
                                            checked={this.state.accessCheck}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Tilganglighetsanpassat"
                                />
                            </div>
                        </GridItem>
                    </GridContainer>
                    <GridContainer justify="flex-end" alignItems="flex-end">
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Salong beskrivelse"
                                id="description"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 10
                                }}
                            />
                        </GridItem>
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

SalongInformasjon.propTypes = {
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
  
  export default withStyles(salongInformasjonStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SalongInformasjon)));
