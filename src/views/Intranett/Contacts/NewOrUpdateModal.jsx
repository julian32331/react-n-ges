/**
 * Description: NewOrUpdate Modal for the My Employees
 * Date: 25/12/2018
 * Author: Danijel
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons

// core components
import Button from "components/CustomButtons/Button.jsx";

import checkInModalStyle from "assets/jss/material-dashboard-pro-react/views/checkInOut/checkInModalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class CheckInModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            simpleSelect: "",
        }
    }

    handleClose() {
        this.props.onClose();
    }

    handleSimple = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

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
            aria-labelledby="checkin-modal-title"
            aria-describedby="checkin-modal-description"
            >
            <DialogTitle
                id="checkin-modal-title"
                disableTypography
                className={classes.modalHeader}
            >
                <h3 className={classes.modalTitle}>Check In</h3>
            </DialogTitle>
            <DialogContent
                id="checkin-modal-description"
                className={classes.modalBody}
            >
                <h4>Who do you wanna check in 17:40?</h4>
                <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                >
                    <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                    >
                        Select Employee
                    </InputLabel>
                    <Select
                        MenuProps={{
                            className: classes.selectMenu
                        }}
                        classes={{
                            select: classes.select + " " + classes.text_left
                        }}
                        value={this.state.simpleSelect}
                        onChange={this.handleSimple}
                        inputProps={{
                            name: "simpleSelect",
                            id: "simple-select"
                        }}
                    >
                        <MenuItem
                            disabled
                            classes={{
                            root: classes.selectMenuItem
                            }}
                        >
                            Select Employee
                        </MenuItem>
                        <MenuItem
                            classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                        >
                            Paris
                        </MenuItem>
                        <MenuItem
                            classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                            }}
                            value="3"
                        >
                            Bucharest
                        </MenuItem>
                        <MenuItem
                            classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                            }}
                            value="4"
                        >
                            Rome
                        </MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                <Button 
                    color="transparent"
                    onClick={() => this.handleClose()}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => this.handleClose()}
                    color="info"
                    simple
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
  }
}

CheckInModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(checkInModalStyle)(CheckInModal);
