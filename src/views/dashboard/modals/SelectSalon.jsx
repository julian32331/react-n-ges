/**
 * Descirption: Select salon modal
 * Date: 4/23/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

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

// core components
import Button from "components/CustomButtons/Button.jsx";

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class SelectSalon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company     : "",
            isEmployee  : false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.workingForId) {
            this.setState({
                company: Number(nextProps.workingForId)
            })
        }
    }

    handleSelect = event => {
        let companyAuthLevel = JSON.parse(this.props.workingFor).find(item => {
            return item.workingForId == event.target.value
        }).companyAuthLevel;
        this.setState({ 
            [event.target.name] : Number(event.target.value),
            isEmployee          : companyAuthLevel === "EMPLOYEE"? true : false
        });
    };

    handleClose() {
        if(this.state.company) {
            this.props.updateUser({
                workingForId    : this.state.company,
                isEmployee      : this.state.isEmployee
            });
            this.props.onClose();
        }
    }

    render() {

        const { classes } = this.props;

        let companies = [];

        if(this.props.workingFor) {
            if (typeof this.props.workingFor === "string") {
                JSON.parse(this.props.workingFor).map(item => {
                    let temp = {}
                    temp['name'] = item.Salon? item.Company.legalName + "/" + item.Salon.name : item.Company.legalName;
                    temp['value'] = item.workingForId;
            
                    companies.push(temp);
                });
            } else {
                this.props.workingFor.map(item => {
                    let temp = {}
                    temp['name'] = item.Salon? item.Company.legalName + "/" + item.Salon.name : item.Company.legalName;
                    temp['value'] = item.workingForId;
            
                    companies.push(temp);
                });
            }
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
                                Choose Company / Salon
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
                                    Choose Company / Salon
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
                        disabled={this.state.company? false : true}
                    >
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SelectSalon.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingFor  : state.auth.workingFor,
        workingForId: state.auth.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateUser: Actions.updateUser
    }, dispatch);
}

export default withStyles(modalStyle)(connect(mapStateToProps, mapDispatchToProps)(SelectSalon));
