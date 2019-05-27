/**
 * Description: Salon Info
 * Date: 4/25/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import CircularProgress from '@material-ui/core/CircularProgress';

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

import * as Utils from "utils/api";
import * as Validator from "utils/validator";
import infoStyle from "assets/jss/material-dashboard-pro-react/views/my_salon/info/infoStyle.jsx";

class Info extends React.Component {
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
            descriptionState: "",

            s_co: "",
            s_coState: "",
            s_address1: "",
            s_address1State: "",
            s_address2: "",
            s_address2State: "",
            s_city: "",
            s_cityState: "",
            s_zip: "",
            s_zipState: "",
            s_country: "",
            s_countryState: "",
            s_mobile: "",
            s_mobileState: "",
            isEdit: false,

            disableBooking: false,
            externalBookingUrl: "",
            bookingWeeks: 1,

            file: null,
            imageData: null,
            imagePreviewUrl: "",
            isEditImage: false
        }
    }

    componentWillMount() {
        this.props.getUser().then(() => {
            this.props.getSalonInfo({
                workingForId: this.props.workingForId
            });
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.workingForId !== nextProps.workingForId) {
            this.props.getSalonInfo({
                workingForId: this.props.workingForId
            });
        }

        if(nextProps.info) {
            this.setState({
                name: nextProps.info.name? nextProps.info.name : "",
                nameState: nextProps.info.name? "success" : "error",
                address: nextProps.info.address? nextProps.info.address : "",
                addressState: nextProps.info.address? "success" : "error",
                zip: nextProps.info.post? nextProps.info.post : "",
                zipState: nextProps.info.post? "success" : "error",
                city: nextProps.info.city? nextProps.info.city : "",
                cityState: nextProps.info.city? "success" : "error",
                phone: nextProps.info.telephone? nextProps.info.telephone : "",
                phoneState: nextProps.info.telephone? "success" : "",
                email: nextProps.info.email? nextProps.info.email : "",
                emailState: nextProps.info.email? "success" : "",
                network: nextProps.info.website? nextProps.info.website : "",
                networkState: nextProps.info.website? "success" : "",
                description: nextProps.info.description? nextProps.info.description : "",
                descriptionState: nextProps.info.description? "success" : "",
                parkCheck: nextProps.info.parking,
                accessCheck: nextProps.info.accessibility,

                s_co: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.co? nextProps.info.ShippingAddress.co : "",
                s_coState: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.co? "success" : "",
                s_address1: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.street1? nextProps.info.ShippingAddress.street1 : "",
                s_address1State: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.street1? "success" : "error",
                s_address2: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.street2? nextProps.info.ShippingAddress.street2 : "",
                s_address2State: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.street2? "success" : "",
                s_city: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.city? nextProps.info.ShippingAddress.city : "",
                s_cityState: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.city? "success" : "error",
                s_zip: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.postalCode? nextProps.info.ShippingAddress.postalCode : "",
                s_zipState: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.postalCode? "success" : "error",
                s_country: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.country? nextProps.info.ShippingAddress.country : "",
                s_countryState: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.country? "success" : "error",
                s_mobile: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.mobile? nextProps.info.ShippingAddress.mobile : "",
                s_mobileState: nextProps.info.ShippingAddress && nextProps.info.ShippingAddress.mobile? "success" : "error",

                disableBooking: !nextProps.info.bookingEnabled,
                externalBookingUrl: nextProps.info.externalBookingUrl,
                externalBookingUrlState: nextProps.info.externalBookingUrl? "success" : "",
                bookingWeeks: nextProps.info.bookingWeeks? nextProps.info.bookingWeeks : 1,

            })
        }

        if(nextProps.gallery) {
            this.setState({
                imageData: nextProps.gallery.imagePath? nextProps.gallery : null,
                imagePreviewUrl: nextProps.gallery.imagePath? Utils.root + nextProps.gallery.imagePath : "" 
            }) 
        } else {
            this.setState({
                imageData: null,
                imagePreviewUrl: "" 
            }) 
        }
    }

    changeForm(event, stateName, type, length) {
        switch (type) {
            case "name":
            case "address":
            case "zip":
            case "city":
            case "s_address1":
            case "s_zip":
            case "s_city":
            case "s_country":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, length)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break; 
            case "description":
            case "s_co":
            case "s_address2":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, length)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break; 
            case "bookingWeeks":
                this.setState({
                    [stateName]: event.target.value > 0? event.target.value : 1
                })
                if (Validator.verifyLength(event.target.value, length)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break;           
            case "phone":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyPhone(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break;
            case "s_mobile":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyPhone(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
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
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break;
            case "network":
            case "externalBookingUrl":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyUrl(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break;
            case "parkCheck":
            case "accessCheck":
                this.setState({ [stateName]: event.target.checked })
            default:
                break;
        }
    }
    handleToggle = name => event => {
        this.setState({ 
            [name]: event.target.checked,
        });
    };

    canUpdateInfo() {
        if(this.state.nameState === "success" &&
            this.state.addressState === "success" &&
            this.state.zipState === "success" &&
            this.state.cityState === "success" &&
            this.state.s_address1State === "success" &&
            this.state.s_cityState === "success" &&
            this.state.s_zipState === "success" &&
            this.state.s_mobileState === "success" &&
            this.state.s_countryState === "success") {
                return true;
        } else {
            return false
        }
    }

    enableEditInfo() {
        this.setState({
            isEdit: true
        })
    }

    cancelEdit() {
        this.setState({
            name: this.props.info.name? this.props.info.name : "",
            nameState: this.props.info.name? "success" : "error",
            address: this.props.info.address? this.props.info.address : "",
            addressState: this.props.info.address? "success" : "error",
            zip: this.props.info.post? this.props.info.post : "",
            zipState: this.props.info.post? "success" : "error",
            city: this.props.info.city? this.props.info.city : "",
            cityState: this.props.info.city? "success" : "error",
            phone: this.props.info.telephone? this.props.info.telephone : "",
            phoneState: this.props.info.telephone? "success" : "",
            email: this.props.info.email? this.props.info.email : "",
            emailState: this.props.info.email? "success" : "",
            network: this.props.info.website? this.props.info.website : "",
            networkState: this.props.info.website? "success" : "",
            description: this.props.info.description? this.props.info.description : "",
            descriptionState: this.props.info.description? "success" : "",

            s_co: this.props.info.ShippingAddress && this.props.info.ShippingAddress.co? this.props.info.ShippingAddress.co : "",
            s_coState: this.props.info.ShippingAddress && this.props.info.ShippingAddress.co? "success" : "error",
            s_address1: this.props.info.ShippingAddress && this.props.info.ShippingAddress.street1? this.props.info.ShippingAddress.street1 : "",
            s_address1State: this.props.info.ShippingAddress && this.props.info.ShippingAddress.street1? "success" : "error",
            s_address2: this.props.info.ShippingAddress && this.props.info.ShippingAddress.street2? this.props.info.ShippingAddress.street2 : "",
            s_address2State: this.props.info.ShippingAddress && this.props.info.ShippingAddress.street2? "success" : "",
            s_city: this.props.info.ShippingAddress && this.props.info.ShippingAddress.city? this.props.info.ShippingAddress.city : "",
            s_cityState: this.props.info.ShippingAddress && this.props.info.ShippingAddress.city? "success" : "error",
            s_zip: this.props.info.ShippingAddress && this.props.info.ShippingAddress.postalCode? this.props.info.ShippingAddress.postalCode : "",
            s_zipState: this.props.info.ShippingAddress && this.props.info.ShippingAddress.postalCode? "success" : "error",
            s_country: this.props.info.ShippingAddress && this.props.info.ShippingAddress.country? this.props.info.ShippingAddress.country : "",
            s_countryState: this.props.info.ShippingAddress && this.props.info.ShippingAddress.country? "success" : "error",
            s_mobile: this.props.info.ShippingAddress && this.props.info.ShippingAddress.mobile? this.props.info.ShippingAddress.mobile : "",
            s_mobileState: this.props.info.ShippingAddress && this.props.info.ShippingAddress.mobile? "success" : "error",

            disableBooking: !this.props.info.bookingEnabled,
            externalBookingUrl: this.props.info.externalBookingUrl,
            externalBookingUrlState: this.props.info.externalBookingUrl? "success" : "",
            bookingWeeks: this.props.info.bookingWeeks? this.props.info.bookingWeeks : 1,

            isEdit: false
        });
    }

    updateSalonInfo() {
        this.props.updateSalonInfo({
            workingForId: this.props.workingForId,
            salonData: {
                email: this.state.email,
                name: this.state.name,
                description: this.state.description,
                telephone: this.state.phone,
                accessibility: this.state.accessCheck,
                parking: this.state.parkCheck,
                website: this.state.network,
                address: this.state.address,
                post: this.state.zip,
                city: this.state.city,
                country: "Sweden",
                bookingEnabled: !this.state.disableBooking,
                externalBookingUrl: this.state.disableBooking? this.state.externalBookingUrl : "",
                bookingWeeks: this.state.bookingWeeks
            },
            shippingAddress: {
                street1: this.state.s_address1,
                street2: this.state.s_address2,
                postalCode: this.state.s_zip,
                city: this.state.s_city,
                country: this.state.s_country,
                co: this.state.s_co,
                mobile: this.state.s_mobile
            }
        })
        this.setState({
            isEdit: false
        })
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            isEditImage: true,
            imagePreviewUrl: reader.result
          });
        };
        reader.readAsDataURL(file);
    }
    
    handleClick() {
        this.refs.fileInput.click();
    }

    saveImage() {
        let payload = new FormData();

        payload.append('workingForId', this.props.workingForId);
        payload.append('gallery', this.state.file, 'avatar.png');

        if(this.state.imageData) {
            payload.append('id', this.state.imageData.id);
            this.props.updateSalonGallery(payload);
        } else {
            this.props.addSalonGallery(payload);
        }
    
        this.setState({
            isEditImage: false
        })
    }

    deleteImage() {
        this.props.deleteSalonGallery({
            workingForId: this.props.workingForId,
            id: this.state.imageData.id
        })
    }

    cancelImageEdit() {
        this.setState({
            imageData: this.props.gallery.imagePath? this.props.gallery : null,
            imagePreviewUrl: this.props.gallery.imagePath? Utils.root + this.props.gallery.imagePath : "",
            isEditImage: false
        })
    }

    render() {
        const { classes, loading } = this.props;
        return (
            <div>
                <Card classes={{card: classes.card1}}>
                {
                    loading &&
                        <div className={classes.loading_container}>
                            <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                        </div>
                }
                {
                    !loading &&
                        <div>
                            <CardHeader>            
                                <div className={classes.cardHeader}>
                                    <h3 className={classes.cardTitle}>Salongsinformation</h3>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <GridContainer alignItems="center"> 
                                        <GridItem xs={12} sm={6} md={3}>                                       
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        disabled={!this.state.isEdit}
                                                        checked={this.state.disableBooking}
                                                        onChange={this.handleToggle('disableBooking')}
                                                        classes={{
                                                            switchBase: classes.switchBase,
                                                            checked: classes.switchChecked,
                                                            icon: classes.switchIcon,
                                                            iconChecked: classes.switchIconChecked,
                                                            bar: classes.switchBar
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label
                                                }}
                                                label="Stäng av online-bokning?"
                                            />      
                                        </GridItem>
                                        {
                                            this.state.disableBooking? (                
                                                <GridItem xs={12} sm={6} md={3}>
                                                    <CustomInput
                                                        success={this.state.externalBookingUrlState === "success"}
                                                        error={this.state.externalBookingUrlState === "error"}
                                                        labelText="Bokningssida"
                                                        id="externalBooking"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            disabled: !this.state.isEdit,
                                                            onChange: event =>
                                                                this.changeForm(event, "externalBookingUrl", "externalBookingUrl", 1),
                                                            value: this.state.externalBookingUrl,
                                                            type: "text"
                                                        }}
                                                    />
                                                </GridItem>
                                            ) : (
                                                <GridItem xs={12} sm={6} md={3}>
                                                    <CustomInput
                                                        success={true}
                                                        labelText="Enalbed booking weeks"
                                                        id="bookingWeeks"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{                                                   
                                                            disabled: !this.state.isEdit,
                                                            onChange: event =>
                                                                this.changeForm(event, "bookingWeeks", "bookingWeeks", 1),
                                                            value: this.state.bookingWeeks,
                                                            type: "number"
                                                        }}
                                                    />
                                                </GridItem>
                                            )
                                        } 
                                    </GridContainer>
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
                                                        this.state.nameState === "error" &&
                                                            <InputAdornment position="end">
                                                                <Warning className={classes.danger} />
                                                            </InputAdornment>,                                                    
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "name", "name", 1),
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
                                                        this.state.addressState === "error" &&
                                                            <InputAdornment position="end">
                                                                <Warning className={classes.danger} />
                                                            </InputAdornment>,
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "address", "address", 1),
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
                                                        this.state.cityState === "error" &&
                                                            <InputAdornment position="end">
                                                                <Warning className={classes.danger} />
                                                            </InputAdornment>,  
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "city", "city", 1),
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
                                                        this.state.zipState === "error"  &&
                                                            <InputAdornment position="end">
                                                                <Warning className={classes.danger} />
                                                            </InputAdornment>,  
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "zip", "zip", 1),
                                                    value: this.state.zip,
                                                    type: "number"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={4}>
                                            <CustomInput
                                                success={this.state.phoneState === "success"}
                                                error={this.state.phoneState === "error"}
                                                labelText="Telefonnummer"
                                                id="phone"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "phone", "phone", 1),
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
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "email", "email", 1),
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
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "network", "network", 1),
                                                    value: this.state.network,
                                                    type: "url"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                success={this.state.descriptionState === "success"}
                                                error={this.state.descriptionState === "error"}
                                                labelText="Salongsbeskrivning"
                                                id="description"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    multiline: true,
                                                    rows: 3,   
                                                    disabled: !this.state.isEdit,                                 
                                                    onChange: event =>
                                                        this.changeForm(event, "description", "description", 1),
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
                                                                this.changeForm(event, "parkCheck", "parkCheck")
                                                            }
                                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                                            icon={<Check className={classes.uncheckedIcon} />}
                                                            classes={{
                                                                checked: classes.checked,
                                                                root: classes.checkRoot
                                                            }}
                                                            disabled={!this.state.isEdit}
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
                                                                this.changeForm(event, "accessCheck", "accessCheck")
                                                            }
                                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                                            icon={<Check className={classes.uncheckedIcon} />}
                                                            classes={{
                                                                checked: classes.checked,
                                                                root: classes.checkRoot
                                                            }}
                                                            disabled={!this.state.isEdit}
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
                                                labelText="C/O"
                                                id="co"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "s_co", "s_co", 1),
                                                    value: this.state.s_co,
                                                    type: "text"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={3}>
                                            <CustomInput
                                                success={this.state.s_mobileState === "success"}
                                                error={this.state.s_mobileState === "error"}
                                                labelText="Telefonnummer *"
                                                id="phone"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    endAdornment:
                                                        this.state.s_mobileState === "error"  &&
                                                            <InputAdornment position="end">
                                                                <Warning className={classes.danger} />
                                                            </InputAdornment>,
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "s_mobile", "s_mobile", 1),
                                                    value: this.state.s_mobile,
                                                    type: "text"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={3}>
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
                                                        this.state.s_address1State === "error"  &&
                                                            <InputAdornment position="end">
                                                                <Warning className={classes.danger} />
                                                            </InputAdornment>,
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "s_address1", "s_address1", 1),
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
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "s_address2", "s_address2", 1),
                                                    value: this.state.s_address2,
                                                    type: "text"
                                                }}
                                            />
                                        </GridItem>
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
                                                        this.state.s_cityState === "error"  &&
                                                            <InputAdornment position="end">
                                                                <Warning className={classes.danger} />
                                                            </InputAdornment>,
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "s_city", "s_city", 1),
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
                                                        this.state.s_zipState === "error"  &&
                                                            <InputAdornment position="end">
                                                                <Warning className={classes.danger} />
                                                            </InputAdornment>,
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "s_zip", "s_zip", 1),
                                                    value: this.state.s_zip,
                                                    type: "number"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={4}>
                                            <CustomInput
                                                success={this.state.s_countryState === "success"}
                                                error={this.state.s_countryState === "error"}
                                                labelText="Land *"
                                                id="s_country"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    endAdornment:
                                                        this.state.s_countryState === "error"  &&
                                                            <InputAdornment position="end">
                                                                <Warning className={classes.danger} />
                                                            </InputAdornment>,
                                                    disabled: !this.state.isEdit,
                                                    onChange: event =>
                                                        this.changeForm(event, "s_country", "s_country", 1),
                                                    value: this.state.s_country,
                                                    type: "text"
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer justify="flex-end" alignItems="flex-end">
                                    {
                                        this.state.isEdit? (                      
                                            <GridItem xs={12} sm={12} md={6} className={classes.right}>       
                                                <Button color="danger" size="sm" className={classes.mr_8} onClick={this.cancelEdit.bind(this)}>Cancel</Button>
                                                <Button color="info" size="sm" disabled={!this.canUpdateInfo()} onClick={this.updateSalonInfo.bind(this)}>Spara</Button>
                                            </GridItem>                                
                                        ) : (
                                            <GridItem xs={12} sm={12} md={6} className={classes.right}>                    
                                                <Button color="info" size="sm" className={classes.submit} onClick={this.enableEditInfo.bind(this)}>Redigera</Button>
                                            </GridItem> 
                                        )
                                    } 
                                    </GridContainer>
                                </form>
                            </CardBody>
                        </div>
                }                    
                </Card>

                <Card classes={{card: classes.card2}}>
                {
                    loading &&
                        <div className={classes.loading_container}>
                            <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                        </div>
                }
                {
                    !loading &&
                        <div>
                            <CardHeader>           
                                <div className={classes.cardHeader}>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6}>
                                            <h3 className={classes.cardTitle}>Galleries</h3>
                                        </GridItem>
                                        {
                                            this.state.isEditImage? (
                                                <GridItem xs={12} sm={6} className={classes.right}>
                                                    <Button 
                                                        color="danger" 
                                                        size="sm"
                                                        onClick={() => this.cancelImageEdit()}
                                                        className={classes.mr_8}
                                                    >                            
                                                        Cancel
                                                    </Button>
                                                    <Button 
                                                        color="info" 
                                                        size="sm"
                                                        onClick={() => this.saveImage()}
                                                    >                            
                                                        Save
                                                    </Button>
                                                </GridItem>
                                            ) : (
                                                <GridItem xs={12} sm={6} className={classes.right}>
                                                    <Button 
                                                        color="danger" 
                                                        size="sm"
                                                        onClick={() => this.deleteImage()}
                                                        className={classes.mr_8}
                                                    >                            
                                                        Delete
                                                    </Button>
                                                    <Button 
                                                        color="info" 
                                                        size="sm"
                                                        onClick={() => this.handleClick()}
                                                    >                            
                                                        {this.state.imageData? "Update" : "Add"}
                                                    </Button>
                                                </GridItem>
                                            )
                                        }
                                    </GridContainer>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className={classes.center}>
                                    <h4>Här kan du lägga till bilder från din salong som visas för kunderna i appen</h4>
                                    <input type="file" hidden onChange={this.handleImageChange.bind(this)} ref="fileInput" />
                                    <img src={this.state.imagePreviewUrl} className={classes.img} />
                                </div>
                            </CardBody>
                        </div>
                }
                </Card>
            </div>
        );
    }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId: state.auth.workingForId,
        loading     : state.my_salon.info.loading,
        error       : state.my_salon.info.error,
        info        : state.my_salon.info.info,
        gallery     : state.my_salon.info.gallery
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser             : Actions.getUser,
        getSalonInfo        : Actions.getSalonInfo,
        updateSalonInfo     : Actions.updateSalonInfo,
        addSalonGallery     : Actions.addSalonGallery,
        updateSalonGallery  : Actions.updateSalonGallery,
        deleteSalonGallery  : Actions.deleteSalonGallery
    }, dispatch);
}

export default withStyles(infoStyle)(connect(mapStateToProps, mapDispatchToProps)(Info));
