/**
 * Description: Salon create
 * Date: 2/4/2019
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

import * as Validator from "utils/validator";
import * as Utils from 'utils/api';

import commonStyle from "assets/jss/material-dashboard-pro-react/views/commonStyle.jsx";

class CreateSalon extends React.Component {
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
            description: "",

            s_co: "",
            s_coState: "",
            // s_address1: "",
            // s_address1State: "",
            // s_address2: "",
            // s_address2State: "",
            s_city: "",
            s_cityState: "",
            s_zip: "",
            s_zipState: "",
            s_country: "",
            s_countryState: "",
            s_mobile: "",
            s_mobileState: ""
        }
    }

    componentWillMount() {
        this.props.getUser()
    }

    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "name":
            case "address":
            case "zip":
            case "city":
            case "description":
            // case "s_address1":
            case "s_zip":
            case "s_city":
            case "s_country":
            case "s_mobile":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;                
            case "phone":
            case "s_co":
            // case "s_address2":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break; 
            case "email":
                this.setState({
                    email: event.target.value
                })
                if (Validator.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break;
            case "network":
                this.setState({
                    network: event.target.value
                })
                if (Validator.verifyUrl(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
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
        if(this.state.nameState === "success" &&
            this.state.addressState === "success" &&
            this.state.zipState === "success" &&
            this.state.cityState === "success" &&
            // this.state.s_address1State === "success" &&
            this.state.s_cityState === "success" &&
            this.state.s_zipState === "success" &&
            this.state.s_mobileState === "success" &&
            this.state.s_countryState === "success") {
            return false;
        } else {
            return true
        }
    }

    addSalonInfo() {
        Utils.xapi().post('register/salon', {
            workingForId: this.props.workingForId,
            email: this.state.email,
            name: this.state.name,
            description: this.state.description,
            telephone: this.state.phone,
            parking: this.state.parkCheck,
            website: this.state.network,
            address: this.state.address,
            post: this.state.zip,
            city: this.state.city,
            country: "Sweden",
            shippingAddress: {
                // street1: this.state.s_address1,
                // street2: this.state.s_address2,
                postalCode: this.state.s_zip,
                city: this.state.s_city,
                country: this.state.s_country,
                co: this.state.s_co,
                mobile: this.state.s_mobile
            }
        }).then((response) => {
            let companyAuthLevel = response.data.workingFor.find(item => {
                return item.workingForId === Number(this.props.workingForId)
            }).companyAuthLevel;

            this.props.updateUser({
                ...response.data,
                isEmployee: companyAuthLevel === "EMPLOYEE"? true : false
            })
        })
    }

    render() {
        const { classes } = this.props;
        return (
        <Card>
            <CardHeader>            
                <div className={classes.cardHeader}>
                    <h3 className={classes.cardTitle}>Create First Salon</h3>
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={3}>
                            <CustomInput
                                success={this.state.nameState === "success"}
                                error={this.state.nameState === "error"}
                                labelText="Salongens namn *"
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
                        <GridItem xs={12} sm={6} md={3}>
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
                                    onChange: event =>
                                        this.change(event, "address", "address", 0),
                                    value: this.state.address,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
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
                                    onChange: event =>
                                        this.change(event, "city", "city", 0),
                                    value: this.state.city,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
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
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.phoneState === "success"}
                                error={this.state.phoneState === "error"}
                                labelText="Mobilnummer"
                                id="phone"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.change(event, "phone", "phone", 1),
                                    value: this.state.phone,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.emailState === "success"}
                                error={this.state.emailState === "error"}
                                labelText="E-post"
                                id="email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.change(event, "email", "email", 0),
                                    value: this.state.email,
                                    type: "email"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                success={this.state.networkState === "success"}
                                error={this.state.networkState === "error"}
                                labelText="Hemsida"
                                id="network"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.change(event, "network", "network", 0),
                                    value: this.state.network,
                                    type: "url"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Salongsbeskrivning"
                                id="description"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 4,   
                                    onChange: event =>
                                        this.change(event, "description", "description", 0),
                                    value: this.state.description,
                                    type: "text"
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
                                    label="Har salongen Parkering"
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
                                    label="Tillgänglighetsanpassat"
                                />
                            </div>
                        </GridItem>
                    </GridContainer>            
                    <div className={classes.cardHeader}>
                        <h3 className={classes.cardTitle}>Leveransadress</h3>
                    </div>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={3}>
                            <CustomInput
                                success={this.state.s_coState === "success"}
                                error={this.state.s_coState === "error"}
                                labelText="Co"
                                id="city"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.change(event, "s_co", "s_co", 0),
                                    value: this.state.s_co,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <CustomInput
                                success={this.state.s_mobileState === "success"}
                                error={this.state.s_mobileState === "error"}
                                labelText="Mobilnummer *"
                                id="phone"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                    this.state.s_mobileState === "error" ? (
                                        <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                        </InputAdornment>
                                    ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "s_mobile", "s_mobile", 1),
                                    value: this.state.s_mobile,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        {/* <GridItem xs={12} sm={6} md={3}>
                            <CustomInput
                                success={this.state.s_address1State === "success"}
                                error={this.state.s_address1State === "error"}
                                labelText="Adress1 *"
                                id="address"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_address1State === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "s_address1", "s_address1", 0),
                                    value: this.state.s_address1,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <CustomInput
                                success={this.state.s_address2State === "success"}
                                error={this.state.s_address2State === "error"}
                                labelText="Adress2"
                                id="address"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.change(event, "s_address2", "s_address2", 0),
                                    value: this.state.s_address2,
                                    type: "text"
                                }}
                            />
                        </GridItem> */}
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.s_cityState === "success"}
                                error={this.state.s_cityState === "error"}
                                labelText="Postort *"
                                id="city"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_cityState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "s_city", "s_city", 0),
                                    value: this.state.s_city,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.s_zipState === "success"}
                                error={this.state.s_zipState === "error"}
                                labelText="Postnummer *"
                                id="zip"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_zipState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "s_zip", "s_zip", 0),
                                    value: this.state.s_zip,
                                    type: "number"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4} className={classes.pt_8}>                        
                            <FormControl
                                fullWidth
                                className={classes.selectFormControl}
                            >
                                <InputLabel
                                    htmlFor="country-select"
                                    className={this.state.s_country? classes.selectLabel + " " + classes.success : classes.selectLabel}
                                >
                                    Land *
                                </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select + " " + classes.left
                                    }}
                                    value={this.state.s_country}
                                    onChange={event =>
                                        this.change(event, "s_country", "s_country", 1)}
                                    inputProps={{
                                        name: "countrySelect",
                                        id: "country-select"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        Land
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="Sweden"
                                    >
                                        Sverige
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            {/* <CustomInput
                                success={this.state.s_countryState === "success"}
                                error={this.state.s_countryState === "error"}
                                labelText="Land *"
                                id="s_country"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_countryState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    onChange: event =>
                                        this.change(event, "s_country", "s_country", 0),
                                    value: this.state.s_country,
                                    type: "text"
                                }}
                            /> */}
                        </GridItem>
                    </GridContainer>
                    <GridContainer justify="flex-end" alignItems="flex-end">                   
                        <GridItem xs={12} sm={12} md={6}>                    
                            <Button color="info" size="sm" className={classes.submit} disabled={this.canSubmit()} onClick={this.addSalonInfo.bind(this)}>Spara</Button>
                        </GridItem>  
                    </GridContainer>
                </form>
            </CardBody>
        </Card>
        );
    }
}

CreateSalon.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId: state.auth.workingForId
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({          
        getUser     : Actions.getUser,
        updateUser  : Actions.updateUser
    }, dispatch);
}
  
export default withStyles(commonStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateSalon)));
