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
import TextField from '@material-ui/core/TextField';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
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
            qty: 3
        }
    }

    render() {
        const { classes, data } = this.props;
        return (
            <Dialog
                classes={{
                    root: classes.center + " " + classes.modalRoot,
                    paper: classes.modal
                }}
                    open={this.props.onOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.props.onClose()}
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
                {
                    data &&
                        <DialogContent
                            id="setting-break-time-description"
                            className={classes.modalBody}
                        >
                            <Magnifier src={data.imageURL !== ""? data.imageURL : noImage} width={250} height={250} mgShape={'square'} style={{border: 'solid 1px #000', padding: '4px', borderRadius: '4px', background: '#ddd'}} />
                            <h4><b>Name: </b>{data.name}</h4>
                            <div style={{paddingBottom: '15px',}}>
                                <span><b>Article No:</b> {data.articleNo}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span><b>Price: Kr:</b> {data.price}</span>
                            </div>
                            <GridContainer justify="center" alignItems="center">
                                <GridItem xs={4}>
                                    <TextField
                                        id="outlined-bare"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                        inputProps={{
                                            className: classes.qty,
                                            onChange: (event)=> event.target.value > 2 && this.setState({qty: event.target.value})
                                        }}
                                        value={this.state.qty}
                                    />
                                </GridItem>
                                <GridItem xs={3}>
                                    <Button color="info" round size="sm" onClick={() => this.props.addCart(data, this.state.qty)}>
                                        Add
                                    </Button>
                                </GridItem>   
                            </GridContainer>
                        </DialogContent>
                }
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