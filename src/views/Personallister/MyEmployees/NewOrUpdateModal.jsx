/**
 * Descirption: NewOrUpdate modal for saloon service
 * Date: 12/23/2018
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Danger from "components/Typography/Danger.jsx";

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";
import avatar from "assets/img/faces/marc.jpg";

import * as Validator from "./../../../validator";
import * as Utils from 'utils';

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class NewOrUpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailState: "",
            consumerOwner: "",
            hasConsumerOwner: false,
            companyAuthLevel: "",
            salonAuthLevel: "",
            bookingPaymentFor: "",
            productPaymentFor: "",
            
            file: null,
            imagePreviewUrl: avatar,
            firstStep: true,
            secondStep: false,
            thirdStep: false,

            name: "",
            nameState: "",
            ssn: "",
            ssnState: "",
            phone: "",
            phoneState: "",
            profession: "",
            professionState: "",
            position: "",
            positionState: "",
            description: "",
            descriptionState: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.employee !== this.props.employee) {
            if(nextProps.employee){
                console.log('employee founded.');
                if(nextProps.employee.hasCompany) {
                    this.setState({
                        firstStep: false,
                        secondStep: true,
                        imagePreviewUrl: Utils.root + nextProps.employee.EmployeeInformation.picturePath
                    })
                } else {
                    this.setState({
                        firstStep: false,
                        thirdStep: true,
                        imagePreviewUrl: Utils.root + nextProps.employee.EmployeeInformation.picturePath,
                        consumerOwner: "SALON",
                        bookingPaymentFor: "COMPANY",
                        productPaymentFor: "COMPANY"
                    })
                }            
            } else if(typeof nextProps.employee === 'boolean') {
                console.log('employee not founded.');
                this.setState({
                    firstStep: false,
                    secondStep: true
                })
            }
        }
    }

    initState() {
        this.setState({
            email: "",
            emailState: "",
            consumerOwner: "",
            hasConsumerOwner: false,
            companyAuthLevel: "",
            salonAuthLevel: "",
            bookingPaymentFor: "",
            productPaymentFor: "",
            
            file: null,
            imagePreviewUrl: avatar,
            firstStep: true,
            secondStep: false,
            thirdStep: false,
            
            name: "",
            nameState: "",
            ssn: "",
            ssnState: "",
            phone: "",
            phoneState: "",
            profession: "",
            professionState: "",
            position: "",
            positionState: "",
            description: "",
            descriptionState: "",
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "email":
                this.setState({ 
                    [stateName]: event.target.value,
                    [stateName + "State"]: Validator.verifyEmail(event.target.value)? "success" : "error"
                });
                break;                
            case "name":            
            case "ssn":            
            case "phone":            
            case "profession":            
            case "position":          
            case "description":
                this.setState({ 
                    [stateName]: event.target.value,
                    [stateName + "State"]: Validator.verifyLength(event.target.value, stateNameEqualTo)? "success" : "error"
                });
                break;                 
            case "consumerOwner":   
            case "companyAuthLevel":   
            case "salonAuthLevel":   
            case "bookingPaymentFor":   
            case "productPaymentFor":
                this.setState({ 
                    [stateName]: event.target.value,
                });
                break;
            default:
                break;
        }
    }

    // Step 1
    checkEmployee() {
        this.props.checkEmployee({
            workingForId: this.props.workingForId,
            email: this.state.email
        })
    }

    // Step 2
    selectConsumerOwner(value) {
        if(value) {
            console.log('consumerOwner: ', "EMPLOYEE");
            this.setState({
                secondStep: false,
                thirdStep: true,
                hasConsumerOwner: true,
                consumerOwner: "EMPLOYEE"
            })
        } else {
            console.log('consumerOwner: ', "SALON");
            this.setState({
                secondStep: false,
                thirdStep: true,
                hasConsumerOwner: true,
                consumerOwner: "SALON"
            })
        }

    }

    isInviteOrAdd(value) {
        if(value) {
            this.props.inviteEmployee({
                workingForId: this.props.workingForId,
                email: this.state.email
            })
            this.handleClose();
        } else {
            this.setState({
                secondStep: false,
                thirdStep: true,
                imagePreviewUrl: avatar,
                consumerOwner: "SALON",
                bookingPaymentFor: "COMPANY",
                productPaymentFor: "COMPANY"
            })
        }
    }
    
    handleImageChange(e) {
        console.log('e: ', e);
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        };
        reader.readAsDataURL(file);
    }
    handleClick() {
        if(!this.props.employee) {
            this.refs.fileInput.click();
        }
    }

    canSave() {
        if(this.props.employee) {
            if(this.state.consumerOwner && this.state.companyAuthLevel && this.state.salonAuthLevel && this.state.bookingPaymentFor && this.state.productPaymentFor) {
                return false
            } else {
                return true
            }
        } else {            
            if(this.state.nameState === "success" && this.state.ssnState === "success" && this.state.phoneState === "success" && this.state.professionState === "success" && this.state.positionState === "success" && this.state.descriptionState === "success" && this.state.consumerOwner && this.state.companyAuthLevel && this.state.salonAuthLevel && this.state.bookingPaymentFor && this.state.productPaymentFor) {
                return false
            } else {
                return true
            }
        }
    }

    save() {
        console.log('focus')
        if(this.props.employee) {
            this.props.addEmployee({
                workingForId: this.props.workingForId,
                hairdresserId: this.props.employee.hairdresserId,
                hairdresserEmail: this.state.email,
                consumerOwner: this.state.consumerOwner,
                companyAuthLevel: this.state.companyAuthLevel,
                salonAuthLevel: this.state.salonAuthLevel,
                bookingPaymentFor: this.state.bookingPaymentFor,
                productPaymentFor: this.state.productPaymentFor
            })
        }
        this.handleClose();
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
                aria-labelledby="my-employee-newOrUpdate-modal-title"
                aria-describedby="my-employee-newOrUpdate-modal-description"
            >
                <DialogTitle
                    id="my-employee-newOrUpdate-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>{this.props.modalTitle}</h3>
                </DialogTitle>
                <DialogContent
                    id="my-employee-newOrUpdate-modal-description"
                    className={classes.modalBody}
                >                    
                    {
                        // First step
                        this.state.firstStep? (
                            <form>
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
                                        type: "email",
                                        value: this.state.email,
                                    }}
                                />
                            </form>
                        ) : undefined
                    }
                                        
                    {
                        // Second step
                        this.state.secondStep? (
                            <form>
                                <Danger>
                                    {
                                        this.props.employee? (
                                            <h4>Rent-a-chair own consumer ?</h4>
                                        ) : (
                                            <h4>Is employee you are inviting have company ?</h4>
                                        )
                                    }                                    
                                </Danger>
                            </form>
                        ) : undefined
                    }

                    {
                        // Third step
                        this.state.thirdStep? (
                            <form>                                  
                                <input type="file" hidden onChange={this.handleImageChange.bind(this)} ref="fileInput" />
                                <a onClick={() => this.handleClick()}>
                                    <img src={this.state.imagePreviewUrl} style={{width: '130px', height: '130px', minWidth: '130px', minHeight: '130px', borderRadius: '50%'}} alt="..." />
                                </a>     
                                {
                                    console.log('test: ', this.state.nameState)
                                }                         
                                <CustomInput
                                    success={this.props.employee !== null || this.state.nameState === "success"}
                                    error={this.state.nameState === "error"}
                                    labelText="Name *"
                                    id="name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: this.props.employee? this.props.employee.name : this.state.name,
                                        disabled: this.props.employee? true : false,
                                        type: "text",
                                        onChange: event =>
                                            this.change(event, "name", "name", 1),
                                    }}
                                />
                                <CustomInput
                                    success={this.props.employee? true : false}
                                    labelText="Email *"
                                    id="email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: this.state.email,
                                        disabled: true
                                    }}
                                />
                                <GridContainer>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            success={this.props.employee !== null || this.state.ssnState === "success"}
                                            error={this.state.ssnState === "error"}
                                            labelText="SSNumber *"
                                            id="ssn"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: this.props.employee? this.props.employee.SSNumber : this.state.ssn,
                                                disabled: this.props.employee? true : false,
                                                type: "number",                                                
                                                onChange: event =>
                                                    this.change(event, "ssn", "ssn", 1),
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            success={this.props.employee !== null || this.state.phoneState === "success"}
                                            error={this.state.phoneState === "error"}
                                            labelText="Phone *"
                                            id="phone"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: this.props.employee? this.props.employee.EmployeeInformation.mobile : this.state.phone,
                                                disabled: this.props.employee? true : false,
                                                type: "number",                                                
                                                onChange: event =>
                                                    this.change(event, "phone", "phone", 1),
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>                                
                                <GridContainer>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            success={this.props.employee !== null || this.state.professionState === "success"}
                                            error={this.state.professionState === "error"}
                                            labelText="Profession *"
                                            id="profession"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: this.props.employee? this.props.employee.EmployeeInformation.profession : this.state.profession,
                                                disabled: this.props.employee? true : false,
                                                type: "text",                                                
                                                onChange: event =>
                                                    this.change(event, "profession", "profession", 1),
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            success={this.props.employee !== null || this.state.positionState === "success"}
                                            error={this.state.positionState === "error"}
                                            labelText="Position *"
                                            id="position"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: this.props.employee? this.props.employee.EmployeeInformation.position : this.state.position,
                                                disabled: this.props.employee? true : false,
                                                type: "text",                                                
                                                onChange: event =>
                                                    this.change(event, "position", "position", 1),
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer> 
                                <CustomInput
                                    success={this.props.employee !== null || this.state.descriptionState === "success"}
                                    error={this.state.descriptionState === "error"}
                                    labelText="Description *"
                                    id="description"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        multiline: true,
                                        rows: 3,
                                        value: this.props.employee? this.props.employee.EmployeeInformation.description : this.state.description,
                                        disabled: this.props.employee? true : false,
                                        type: "text",                                                
                                        onChange: event =>
                                            this.change(event, "description", "description", 1),
                                    }}
                                /> 
                                {
                                    this.props.employee && this.props.employee.hasCompany? (
                                        <FormControl
                                            fullWidth
                                            className={classes.formControl}
                                        >
                                            <InputLabel
                                                htmlFor="consumerOwner-select"
                                                className={this.state.consumerOwner? classes.selectLabel + " " + classes.success : classes.selectLabel}
                                            >
                                                Choose ConsumerOwner *
                                            </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select + " " + classes.left + " " + classes.lowercase
                                                }}
                                                value={this.state.consumerOwner}
                                                onChange={event =>
                                                    this.change(event, "consumerOwner", "consumerOwner", 0)}
                                                inputProps={{
                                                    name: "consumerOwnerSelect",
                                                    id: "consumerOwner-select",
                                                    readOnly: this.state.hasConsumerOwner
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                    >
                                                    Choose ConsumerOwner
                                                </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="EMPLOYEE"
                                                >
                                                    employee
                                                </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="SALON"
                                                >
                                                    salon
                                                </MenuItem>
                                            </Select>
                                        </FormControl>  
                                    ) : undefined
                                }
                                <FormControl
                                    fullWidth
                                    className={classes.formControl}
                                >
                                    <InputLabel
                                        htmlFor="companyAuthLevel-select"
                                        className={this.state.companyAuthLevel? classes.selectLabel + " " + classes.success : classes.selectLabel}
                                    >
                                        Choose CompanyAuthLevel *
                                    </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select + " " + classes.left + " " + classes.lowercase
                                        }}
                                        value={this.state.companyAuthLevel}
                                        onChange={event =>
                                            this.change(event, "companyAuthLevel", "companyAuthLevel", 0)}
                                        inputProps={{
                                            name: "companyAuthLevelSelect",
                                            id: "companyAuthLevel-select",
                                        }}
                                    >
                                        <MenuItem
                                            disabled
                                            classes={{
                                                root: classes.selectMenuItem
                                            }}
                                            >
                                            Choose CompanyAuthLevel
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="ADMIN"
                                        >
                                            admin
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="EMPLOYEE"
                                        >
                                            employee
                                        </MenuItem>
                                    </Select>
                                </FormControl>   
                                <FormControl
                                    fullWidth
                                    className={classes.formControl}
                                >
                                    <InputLabel
                                        htmlFor="salonAuthLevel-select"
                                        className={this.state.salonAuthLevel? classes.selectLabel + " " + classes.success : classes.selectLabel}
                                    >
                                        Choose SalonAuthLevel *
                                    </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select + " " + classes.left + " " + classes.lowercase
                                        }}
                                        value={this.state.salonAuthLevel}
                                        onChange={event =>
                                            this.change(event, "salonAuthLevel", "salonAuthLevel", 0)}
                                        inputProps={{
                                            name: "salonAuthLevelSelect",
                                            id: "salonAuthLevel-select",
                                        }}
                                    >
                                        <MenuItem
                                            disabled
                                            classes={{
                                                root: classes.selectMenuItem
                                            }}
                                            >
                                            Choose SalonAuthLevel
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="ADMIN"
                                        >
                                            admin
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="EMPLOYEE"
                                        >
                                            employee
                                        </MenuItem>
                                    </Select>
                                </FormControl>   
                                {
                                    this.props.employee && this.props.employee.hasCompany? (
                                        <div>
                                            <FormControl
                                                fullWidth
                                                className={classes.formControl}
                                            >
                                                <InputLabel
                                                    htmlFor="bookingPaymentFor-select"
                                                    className={this.state.bookingPaymentFor? classes.selectLabel + " " + classes.success : classes.selectLabel}
                                                >
                                                    Choose BookingPaymentFor *
                                                </InputLabel>
                                                <Select
                                                    MenuProps={{
                                                        className: classes.selectMenu
                                                    }}
                                                    classes={{
                                                        select: classes.select + " " + classes.left + " " + classes.lowercase
                                                    }}
                                                    value={this.state.bookingPaymentFor}
                                                    onChange={event =>
                                                        this.change(event, "bookingPaymentFor", "bookingPaymentFor", 0)}
                                                    inputProps={{
                                                        name: "bookingPaymentForSelect",
                                                        id: "bookingPaymentFor-select",
                                                    }}
                                                >
                                                    <MenuItem
                                                        disabled
                                                        classes={{
                                                            root: classes.selectMenuItem
                                                        }}
                                                        >
                                                        Choose BookingPaymentFor
                                                    </MenuItem>
                                                    <MenuItem
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                        value="EMPLOYEE"
                                                    >
                                                        employee
                                                    </MenuItem>
                                                    <MenuItem
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                        value="RENTACHAIR"
                                                    >
                                                        rent-a-chair
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>   
                                            <FormControl
                                                fullWidth
                                                className={classes.formControl}
                                            >
                                                <InputLabel
                                                    htmlFor="productPaymentFor-select"
                                                    className={this.state.productPaymentFor? classes.selectLabel + " " + classes.success : classes.selectLabel}
                                                >
                                                    Choose ProductPaymentFor *
                                                </InputLabel>
                                                <Select
                                                    MenuProps={{
                                                        className: classes.selectMenu
                                                    }}
                                                    classes={{
                                                        select: classes.select + " " + classes.left + " " + classes.lowercase
                                                    }}
                                                    value={this.state.productPaymentFor}
                                                    onChange={event =>
                                                        this.change(event, "productPaymentFor", "productPaymentFor", 0)}
                                                    inputProps={{
                                                        name: "productPaymentForSelect",
                                                        id: "productPaymentFor-select",
                                                    }}
                                                >
                                                    <MenuItem
                                                        disabled
                                                        classes={{
                                                            root: classes.selectMenuItem
                                                        }}
                                                        >
                                                        Choose ProductPaymentFor
                                                    </MenuItem>
                                                    <MenuItem
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                        value="EMPLOYEE"
                                                    >
                                                        employee
                                                    </MenuItem>
                                                    <MenuItem
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                        value="RENTACHAIR"
                                                    >
                                                        rent-a-chair
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>  
                                        </div>
                                    ) : undefined
                                }
                                                       
                            </form>
                        ) : undefined
                    }
                </DialogContent>
                {
                    // First step
                    this.state.firstStep? (
                        <DialogActions className={classes.modalFooter}>
                            <Button
                                onClick={() => this.checkEmployee()}
                                color="info"
                                style={{width: '100%'}}
                                disabled={this.state.emailState !== "success"}
                            >
                                Next
                            </Button>
                        </DialogActions>
                    ) : undefined
                }
                
                
                {
                    // Second step
                    this.state.secondStep? (
                        this.props.employee? (                                
                            <DialogActions className={classes.modalFooter}>
                                <Button
                                    onClick={() => this.selectConsumerOwner(false)}
                                    color="danger"
                                    style={{width: '100%'}}
                                >
                                    No
                                </Button>
                                <Button
                                    onClick={() => this.selectConsumerOwner(true)}
                                    color="info"
                                    style={{width: '100%'}}
                                >
                                    Yes
                                </Button>
                            </DialogActions>  
                        ) : (
                            <DialogActions className={classes.modalFooter}>
                                <Button
                                    onClick={() => this.isInviteOrAdd(false)}
                                    color="danger"
                                    style={{width: '100%'}}
                                >
                                    No
                                </Button>
                                <Button
                                    onClick={() => this.isInviteOrAdd(true)}
                                    color="info"
                                    style={{width: '100%'}}
                                >
                                    Yes
                                </Button>
                            </DialogActions>  
                        )                        
                    ) : undefined
                }

                {
                    // Third step
                    this.state.thirdStep? (                        
                        <DialogActions className={classes.modalFooter}>
                            <Button
                                onClick={() => this.handleClose()}
                                color="danger"
                                style={{width: '100%'}}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => this.save()}
                                color="info"
                                style={{width: '100%'}}
                                disabled={this.canSave()}
                            >
                                Save
                            </Button>
                        </DialogActions>      
                    ) : undefined
                }
            </Dialog>
        );
    }
}

NewOrUpdateModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.user.workingForId,
        employee        : state.employees.employee
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkEmployee    : Actions.checkEmployee,
        inviteEmployee   : Actions.inviteEmployee,
        addEmployee      : Actions.addEmployee,
        updateEmployee   : Actions.updateEmployee,
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewOrUpdateModal)));
