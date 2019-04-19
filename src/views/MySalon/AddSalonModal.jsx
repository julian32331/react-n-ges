/**
 * Description: Modal to add salon
 * Date: 1/29/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";

import * as Validator from "./../../validator";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class AddSalonModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameState: "",
            email: "",
            emailState: "",
            telephone: "",
            telephoneState: "",
            website: "",
            websiteState: "",
            description: "",
            descriptionState: "",
            address: "",
            addressState: "",
            zip: "",
            zipState: "",
            city: "",
            cityState: "",
            country: "Sweden",
            countryState: "",
            hasPark: false,

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
            s_mobile: "",
            s_mobileState: "",
        }
        this.save = this.save.bind(this);
    }

    initState() {
        this.setState({
            name: "",
            nameState: "",
            email: "",
            emailState: "",
            telephone: "",
            telephoneState: "",
            website: "",
            websiteState: "",
            description: "",
            descriptionState: "",
            address: "",
            addressState: "",
            zip: "",
            zipState: "",
            city: "",
            cityState: "",
            country: "Sweden",
            countryState: "",
            hasPark: false,
            
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
            s_mobile: "",
            s_mobileState: "",
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
    }

    save() {
        this.props.addSalon({
            workingForId: this.props.workingForId,
            email: this.state.email,
            name: this.state.name,
            telephone: this.state.telephone,
            description: this.state.description,
            parking: this.state.hasPark,
            accessibility: this.state.access,
            website: this.state.website,
            address: this.state.address,
            post: this.state.zip,
            city: this.state.city,
            country: this.state.country,
            shippingAddress: {
                street1: this.state.s_address1,
                street2: this.state.s_address2,
                postalCode: this.state.s_zip,
                city: this.state.s_city,
                country: this.state.country,
                co: this.state.s_co,
                mobile: this.state.s_mobile
            }
        })
        this.initState();
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "name":
            case "description":
            case "address":
            case "city":
            case "zip":
            case "country":
            case "s_co":
            case "s_address1":
            case "s_address2":
            case "s_zip":
            case "s_city":
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
            case "email":
                this.setState({
                    email: event.target.value
                })
                if (Validator.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "telephone":
                if(this.state.telephone.length === 0) {
                    this.setState({
                        telephone: "+46" + event.target.value
                    })
                } else {
                    this.setState({
                        telephone: event.target.value
                    })
                }
                if (Validator.verifyPhone(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "website":
                this.setState({
                    website: event.target.value
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
    toggleCheck(event, stateName) {
        this.setState({ [stateName]: event.target.checked });
    }

    canSave() {
        if(this.state.nameState === "success" && 
            this.state.emailState === "success" && 
            this.state.telephoneState === "success" && 
            // this.state.websiteState === "success" && 
            this.state.descriptionState === "success" && 
            this.state.addressState === "success" && 
            this.state.zipState === "success" && 
            this.state.cityState === "success" && 
            this.state.countryState === "success" && 
            // this.state.s_coState === "success" &&
            this.state.s_address1State === "success" &&
            // this.state.s_address2State === "success" &&
            this.state.s_cityState === "success" &&
            this.state.s_mobileState === "success" &&
            this.state.s_zipState === "success") {
            return false;
        } else {
            return true;
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <Dialog
                classes={{
                    root: classes.center + " " + classes.modalRoot,
                    paper: classes.modal
                }}
                open={this.props.onOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.handleClose()}
                aria-labelledby="add-salon-modal-title"
                aria-describedby="add-salon-modal-description"
            >
                <DialogTitle
                    id="add-salon-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>Lägg till Salong</h3>
                </DialogTitle>
                <DialogContent
                    id="add-salon-modal-description"
                    className={classes.modalBody}
                >
                    <form>
                        <CustomInput
                            success={this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText="Namn *"
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
                                    this.change(event, "name", "name", 1),
                                type: "text",
                                value: this.state.name
                            }}
                        />
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
                                onChange: event =>
                                    this.change(event, "email", "email", 1),
                                type: "text",
                                value: this.state.email
                            }}
                        />
                        <CustomInput
                            success={this.state.telephoneState === "success"}
                            error={this.state.telephoneState === "error"}
                            labelText="Telefon *"
                            id="telephone"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                endAdornment:
                                    this.state.telephoneState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.change(event, "telephone", "telephone", 1),
                                type: "text",
                                value: this.state.telephone
                            }}
                        />
                        <CustomInput
                            // success={this.state.websiteState === "success"}
                            // error={this.state.websiteState === "error"}
                            labelText="Hemsida"
                            id="web-site"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                // endAdornment:
                                //     this.state.websiteState === "error" ? (
                                //     <InputAdornment position="end">
                                //         <Warning className={classes.danger} />
                                //     </InputAdornment>
                                //     ) : (
                                //     undefined
                                // ),
                                onChange: event =>
                                    this.change(event, "website", "website", 1),
                                type: "text",
                                value: this.state.website
                            }}
                        />
                        <CustomInput
                            success={this.state.descriptionState === "success"}
                            error={this.state.descriptionState === "error"}
                            labelText="Beskrivning *"
                            id="description"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 3,
                                endAdornment:
                                    this.state.descriptionState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.change(event, "description", "description", 1),
                                type: "text",
                                value: this.state.description
                            }}
                        />
                        <GridContainer>
                            <GridItem xs={12} sm={7}>
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
                                            this.change(event, "address", "address", 1),
                                        type: "text",
                                        value: this.state.address
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={5}>
                                <CustomInput
                                    success={this.state.zipState === "success"}
                                    error={this.state.zipState === "error"}
                                    labelText="Postnr *"
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
                                            this.change(event, "zip", "zip", 1),
                                        type: "number",
                                        value: this.state.zip
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
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
                                    this.change(event, "city", "city", 1),
                                type: "text",
                                value: this.state.city
                            }}
                        />
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                        >
                            <InputLabel
                                htmlFor="country-select"
                                className={this.state.country? classes.selectLabel + " " + classes.success : classes.selectLabel}
                            >
                                Välj Land *
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select + " " + classes.left
                                }}
                                value={this.state.country}
                                onChange={event =>
                                    this.change(event, "country", "country", 1)}
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
                                    Välj Land
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
                    <GridContainer>
                        <GridItem xs={12} className={classes.left}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={event =>
                                            this.toggleCheck(event, "hasPark")
                                        }
                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                            checked: classes.checked,
                                            root: classes.checkRoot
                                        }}
                                        checked={this.state.hasPark}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="Har parkering?"
                            />
                        </GridItem>
                        <GridItem xs={12} className={classes.left}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={event =>
                                            this.toggleCheck(event, "access")
                                        }
                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                            checked: classes.checked,
                                            root: classes.checkRoot
                                        }}
                                        checked={this.state.access}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="Tillgänglighetsanpassat"
                            />
                        </GridItem>
                    </GridContainer>
                    <div style={{fontSize: '18px', fontWeight: '500', textAlign: 'left'}}>Leveransadress</div>
                    <CustomInput
                        // success={this.state.s_coState === "success"}
                        // error={this.state.s_coState === "error"}
                        labelText="C/O"
                        id="city"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            // endAdornment:
                            //     this.state.s_coState === "error" ? (
                            //     <InputAdornment position="end">
                            //         <Warning className={classes.danger} />
                            //     </InputAdornment>
                            //     ) : (
                            //     undefined
                            // ),
                            onChange: event =>
                                this.change(event, "s_co", "s_co", 0),
                            value: this.state.s_co,
                            type: "text"
                        }}
                    />                    
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
                    <CustomInput
                        // success={this.state.s_address2State === "success"}
                        // error={this.state.s_address2State === "error"}
                        labelText="Adress2"
                        id="address"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            // endAdornment:
                            //     this.state.s_address2State === "error" ? (
                            //     <InputAdornment position="end">
                            //         <Warning className={classes.danger} />
                            //     </InputAdornment>
                            //     ) : (
                            //     undefined
                            // ),
                            onChange: event =>
                                this.change(event, "s_address2", "s_address2", 0),
                            value: this.state.s_address2,
                            type: "text"
                        }}
                    />
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
                </form>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button 
                        color="danger"
                        size="sm"
                        onClick={() => this.handleClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.save()}
                        color="info"
                        size="sm"
                        disabled={this.canSave()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddSalonModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addSalon:   Actions.addSalon,
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSalonModal)));