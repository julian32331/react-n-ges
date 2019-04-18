/**
 * Description: Modal of the product detail.
 * Date: 4/18/2019
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import Magnifier from 'react-magnifier';

import * as Validator from "./../../../../validator";
import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";
import noImage from "assets/img/no_image.jpg";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment         : "",            
            commentState    : "", 
            hairdresserId   : ""
        }
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "comment":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    handleEmployee = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose() {
        this.props.onClose();
        this.setState({
            comment     : "",        
            commentState: ""
        })
    }

    canSubmit = () => {
        if((this.state.commentState === "success" && this.state.hairdresserId) || (this.state.commentState === "success" && this.props.data.hairdresserId))
            return true;
        else
            return false;
    }

    save = () => {
        const { workingForId, data } = this.props;
        let root = data.hairdresserId? 'time' : 'day';
        this.props.setBreak({
            workingForId    : workingForId,
            hairdresserId   : data.hairdresserId || this.state.hairdresserId,
            breakStartAt    : data.start,
            comment         : this.state.comment
        }, root)
        this.handleClose();
    }

    render() {
        const { classes, data, employees } = this.props;

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
                    aria-labelledby="setting-break-time-title"
                    aria-describedby="setting-break-time-description"
                >
                <DialogTitle
                    id="setting-break-time-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>Details</h3>
                </DialogTitle>
                <DialogContent
                    id="setting-break-time-description"
                    className={classes.modalBody}
                >
                    <Magnifier src={noImage} width={250} height={250} mgShape={'square'} style={{border: 'solid 1px #000', padding: '4px', borderRadius: '4px', background: '#ddd'}} />
                    <div>Name: SKP BC Moisture Spray Cond, 200 ml</div>
                    <div>Article No: G89983474</div>
                    <div>Price: Kr: 104.00</div>
                </DialogContent>
            </Dialog>
        );
  }
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
//   return {
//     workingForId: state.user.workingForId,
//     employees   : state.booking_appointment.employees
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     setBreak: Actions.setBreak
//   }, dispatch);
// }

// export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SetBreakModal)));
export default withStyles(commonModalStyle)(withRouter(Detail));