/**
 * Descirption: Confirm Modal
 * Date: 4/25/2019
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";

// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hairdresser: ""
        }
    }

    changeForm(event, stateName, type, length) {
        switch (type) {
            case "service":
            case "hairdresser":
                this.setState({
                    [stateName]: event.target.value
                })
            default:
                break;
        }
    }

    handleBreak() {
        this.props.toBreak();
    }

    handleBook() {
        this.props.toBook();
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
                onClose={() => {this.props.onClose()}}
                aria-labelledby="confirm-modal-title"
                aria-describedby="confirm-modal-description"
            >
                <DialogTitle
                    id="setting-break-time-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>Direct Booking</h3>
                </DialogTitle>
                <DialogContent
                    id="confirm-modal-description"
                    className={
                    classes.modalBody + " " + classes.modalSmallBody
                    }
                >                                             
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                    >
                        <InputLabel
                            htmlFor="service-select"
                            className={classes.selectLabel}
                        >
                            Select Service *
                        </InputLabel>
                        <Select
                            value={this.state.hairdresser}
                            onChange={(event) => this.changeForm(event, "service", "service")}
                            MenuProps={{ className: classes.selectMenu }}
                            classes={{ select: classes.select }}
                            inputProps={{
                                name: "service",
                                id: "service-select"
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem
                                }}
                            >
                                Service
                            </MenuItem>
                            {
                                this.props.hairdresssers.map((hairdresser, index) => {
                                    return (
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value={hairdresser.hairdresser_id}
                                            key={index}
                                        >
                                            {hairdresser.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                    >
                        <InputLabel
                            htmlFor="hairdresser-select"
                            className={classes.selectLabel}
                        >
                            Select Hairdresser *
                        </InputLabel>
                        <Select
                            value={this.state.hairdresser}
                            onChange={(event) => this.changeForm(event, "hairdresser", "hairdresser")}
                            MenuProps={{ className: classes.selectMenu }}
                            classes={{ select: classes.select }}
                            inputProps={{
                                name: "hairdresser",
                                id: "hairdresser-select"
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem
                                }}
                            >
                                Hairdresser
                            </MenuItem>
                            {
                                this.props.hairdresssers.map((hairdresser, index) => {
                                    return (
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value={hairdresser.hairdresser_id}
                                            key={index}
                                        >
                                            {hairdresser.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                    >
                        <InputLabel
                            htmlFor="hairdresser-select"
                            className={classes.selectLabel}
                        >
                            Select Date & Time *
                        </InputLabel>
                        <Select
                            value={this.state.hairdresser}
                            onChange={(event) => this.changeForm(event, "hairdresser", "hairdresser")}
                            MenuProps={{ className: classes.selectMenu }}
                            classes={{ select: classes.select }}
                            inputProps={{
                                name: "hairdresser",
                                id: "hairdresser-select"
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem
                                }}
                            >
                                Hairdresser
                            </MenuItem>
                            {
                                this.props.hairdresssers.map((hairdresser, index) => {
                                    return (
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value={hairdresser.hairdresser_id}
                                            key={index}
                                        >
                                            {hairdresser.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    
                    <CustomInput
                        success={this.state.consumerNameState === "success"}
                        error={this.state.consumerNameState === "error"}
                        id="fullname"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            placeholder: "Namn",
                            onChange: event => this.change(event, "consumerName", "consumerName", 1),
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                >
                                    <Face classes={{root: classes.iconRoot}} className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <CustomInput
                        success={this.state.consumerEmailState === "success"}
                        error={this.state.consumerEmailState === "error"}
                        id="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            placeholder: "E-post",
                            onChange: event => this.change(event, "consumerEmail", "consumerEmail", 1),
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                >
                                    <Email classes={{root: classes.iconRoot}} className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <CustomInput
                        success={this.state.consumerMobileState === "success"}
                        error={this.state.consumerMobileState === "error"}
                        id="phone"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            placeholder: "Mobilnummer",
                            onChange: event => this.change(event, "consumerMobile", "consumerMobile", 1),
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                >
                                    <Phone classes={{root: classes.iconRoot}} className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        id="outlined-bare"
                        className={classes.textArea}
                        InputProps={{
                            classes: {
                                multiline: classes.multiline,
                                inputMultiline: classes.inputMultiline
                            },
                            onChange: event => this.change(event, "comment", "comment", 1),
                        }}
                        multiline
                        rows="4"
                        fullWidth
                        placeholder="Kommentar"
                        margin="none"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions
                    className={
                        classes.modalFooter
                    }
                >
                    <Button
                        onClick={() => this.handleBreak()}
                        color="danger"
                        size="sm"
                    >
                    Cancel
                    </Button>
                    <Button
                        onClick={() => this.handleBook()}
                        color="info"
                        size="sm"
                    >
                    Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Selector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(modalStyle)(Selector);
