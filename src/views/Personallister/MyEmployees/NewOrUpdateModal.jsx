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

            
            file: null,
            imagePreviewUrl: avatar,
            firstStep: true,
            secondStep: false,
            thirdStep: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.employee) {
            console.log('employee founded.');
            if(nextProps.employee.hasCompany) {
                this.setState({
                    firstStep: false,
                    secondStep: true
                })
            } else {
                this.setState({
                    firstStep: false,
                    thirdStep: true
                })
            }            
        } else if(typeof nextProps.employee === 'boolean') {
            console.log('employee not founded.');
            this.setState({
                firstStep: false,
                thirdStep: true
            })
        }
    }

    initState() {
        this.setState({
            email: "",
            emailState: "",
            
            firstStep: true,
            secondStep: false,
            thirdStep: false
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
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
        this.refs.fileInput.click();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "email":
                this.setState({ 
                    [stateName]: event.target.value,
                    [stateName + "State"]: Validator.verifyEmail(event.target.value)? "success" : "error"
                });
                break;                
            case "consumerOwner":
                console.log('focus: ', event.target.value)
                this.setState({ 
                    [stateName]: event.target.value,
                    [stateName + "State"]: Validator.verifyLength(event.target.value, stateNameEqualTo)? "success" : "error"
                });
                break;
            default:
                break;
        }
    }

    checkEmployee() {
        this.props.checkEmployee({
            workingForId: this.props.workingForId,
            email: this.state.email
        })
    }

    selectConsumerOwner(value) {
        if(value) {
            console.log('consumerOwner: ', "EMPLOYEE");
            this.setState({
                secondStep: false,
                thirdStep: true,
                consumerOwner: "EMPLOYEE"
            })
        } else {
            console.log('consumerOwner: ', "SALON");
            this.setState({
                secondStep: false,
                thirdStep: true,
                consumerOwner: "SALON"
            })
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
                                    <h4>Rent-a-chair own consumer?</h4>
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
                                    <img src={this.state.imagePreviewUrl} style={{width: '130px', height: '130px', borderRadius: '50%'}} alt="..." />
                                </a>                              
                                <CustomInput
                                    success={this.props.employee? true : false}
                                    labelText="Name *"
                                    id="name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: this.props.name,
                                        disabled: true
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
                                            success={this.props.employee? true : false}
                                            labelText="SSNumber *"
                                            id="ssn"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: this.props.ssn,
                                                disabled: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            success={this.props.employee? true : false}
                                            labelText="Phone *"
                                            id="phone"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: this.props.phone,
                                                disabled: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>                                
                                <GridContainer>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            success={this.props.employee? true : false}
                                            labelText="Profession *"
                                            id="profession"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: this.props.profession,
                                                disabled: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            success={this.props.employee? true : false}
                                            labelText="Position *"
                                            id="position"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: this.props.position,
                                                disabled: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer> 
                                <CustomInput
                                    success={this.props.employee? true : false}
                                    labelText="Description *"
                                    id="description"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        multiline: true,
                                        rows: 3,
                                        value: this.props.description,
                                        disabled: true
                                    }}
                                /> 
                                <FormControl
                                    fullWidth
                                >
                                    <InputLabel
                                        htmlFor="consumerOwner-select"
                                        className={classes.selectLabel}
                                    >
                                        Choose ConsumerOwner *
                                    </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={this.state.consumerOwner}
                                        onChange={event =>
                                            this.change(event, "consumerOwner", "consumerOwner", 0)}
                                        inputProps={{
                                            name: "consumerOwnerSelect",
                                            id: "consumerOwner-select",
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
                                        }   
                                    </Select>
                                </FormControl>                               
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
                    ) : undefined
                }

                {
                    // Third step
                    this.state.thirdStep? (                        
                        <DialogActions className={classes.modalFooter}>
                            <Button
                                onClick={() => this.setState({
                                    secondStep: false,
                                    thirdStep: true
                                })}
                                color="danger"
                                style={{width: '100%'}}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => this.setState({
                                    secondStep: false,
                                    thirdStep: true
                                })}
                                color="info"
                                style={{width: '100%'}}
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
        updateEmployee   : Actions.updateEmployee,
        checkEmployee    : Actions.checkEmployee
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewOrUpdateModal)));
