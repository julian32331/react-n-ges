/**
 * Descirption: NewOrUpdate modal for saloon service
 * Date: 12/28/2018
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

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

class SelectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "",
        }

        this.props.getUserData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.workingForId) {
            this.setState({
                company: Number(nextProps.workingForId)
            })
        }
    }

    handleSelect = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleClose() {
        if(this.state.company) {
            this.props.updateWorkingForId(this.state.company);
            this.props.onClose();
        }
    }

    render() {

        const { classes } = this.props;

        let companies = [];

        if(this.props.workingFor) {
            JSON.parse(this.props.workingFor).map(item => {
                let temp = {}
                temp['name'] = item.Salon? item.Company.legalName + "/" + item.Salon.name : item.Company.legalName;
                temp['value'] = item.workingForId;
    
                companies.push(temp);
            });
        }

        return (
            <Dialog
                classes={{
                    root: classes.center + " " + classes.modalRoot,
                    paper: classes.modal
                }}
                open={this.props.onOpen}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="company-select-modal-title"
                aria-describedby="company-select-modal-description"
            >
                <DialogTitle
                    id="company-select-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>Company & Saloon</h3>
                </DialogTitle>
                <DialogContent
                    id="company-select-modal-description"
                    className={classes.modalBody}
                >
                    <form>
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                        >
                            <InputLabel
                                htmlFor="company"
                                className={classes.selectLabel}
                                >
                                Choose Company/Salon
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select + " " + classes.left
                                }}
                                value={this.state.company}
                                onChange={this.handleSelect}
                                inputProps={{
                                    name: "company",
                                    id: "company"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    Choose Company
                                </MenuItem>
                                {
                                    companies.map((company, index) => {
                                        return (
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value={company.value}
                                                key={index}
                                            >
                                                {company.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button
                        onClick={() => this.handleClose()}
                        color="info"
                        size="sm"
                    >
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SelectModal.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingFor: state.user.workingFor,
        workingForId: state.user.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserData: Actions.getUserData,
        updateWorkingForId: Actions.updateWorkingForId
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectModal)));
