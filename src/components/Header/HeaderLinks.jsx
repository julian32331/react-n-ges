import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Select from "@material-ui/core/Select";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    openNotification: false,
    openUser: false,
    saloonSelect: "",
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.workingForId) {
        this.setState({
          saloonSelect: Number(nextProps.workingForId)
        })
    }
  }

  handleClickNotification = () => {
    this.setState({ openNotification: !this.state.openNotification });
  };
  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };  
  
  handleClickUser = () => {
    this.setState({ openUser: !this.state.openUser });
  };
  handleCloseUser = () => {
    this.setState({ openUser: false });
  }; 
  profile = () => {
    this.setState({ openUser: false });
    this.props.history.push('/profile');
  }
  logout = () => {
    this.setState({ openUser: false });
    localStorage.clear();
    this.props.history.push("/login");
  }

  handleSaloon = event => {
    let companyAuthLevel = JSON.parse(this.props.workingFor).find(item => {
        return item.workingForId === event.target.value
    }).companyAuthLevel;
    this.setState({ 
        [event.target.name]: Number(event.target.value),
        isEmployee: companyAuthLevel === "EMPLOYEE"? true : false
    });
    this.props.updateWorkingForId({
      workingForId: Number(event.target.value),
      isEmployee: companyAuthLevel === "EMPLOYEE"? true : false
    });
    // this.setState({ [event.target.name]: event.target.value });
    // this.props.updateWorkingForId(event.target.value);
  };

  render() {
    const { classes, rtlActive } = this.props;
    const { openNotification, openUser } = this.state;
    const searchButton =
      classes.top +
      " " +
      classes.searchButton +
      " " +
      classNames({
        [classes.searchRTL]: rtlActive
      });
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.infoHover,
      { [classes.dropdownItemRTL]: rtlActive }
    );
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });

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
      <div className={wrapper}>
        <div className={managerClasses + " " + classes.saloon_select_container}>          
          <Select
            MenuProps={{
              className: classes.selectMenu
            }}
            classes={{
              select: classes.select + " " + classes.saloon_select
            }}
            value={this.state.saloonSelect}
            onChange={this.handleSaloon}
            inputProps={{
              name: "saloonSelect",
              id: "saloon-select"
            }}
          >
            <MenuItem
              disabled
              classes={{
                root: classes.selectMenuItem
              }}
            >
              Choose Company & Saloon
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
        </div>
        {/* <div className={managerClasses}>
          <Button
            color="transparent"
            justIcon
            aria-label="Notifications"
            aria-owns={openNotification ? "menu-list" : null}
            aria-haspopup="true"
            onClick={this.handleClickNotification}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : ""
            }}
            buttonRef={node => {
              this.anchorEl = node;
            }}
          >
            <Notifications
              className={
                classes.headerLinksSvg +
                " " +
                (rtlActive
                  ? classes.links + " " + classes.linksRTL
                  : classes.links)
              }
            />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp implementation="css">
              <span onClick={this.handleClickNotification} className={classes.linkText}>
                {rtlActive ? "إعلام" : "Notification"}
              </span>
            </Hidden>
          </Button>
          <Popper
            open={openNotification}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !openNotification,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleCloseNotification}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "إجلاء أوزار الأسيوي حين بل, كما"
                          : "Notification-1"}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "شعار إعلان الأرضية قد ذلك"
                          : "Notification-2"}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "ثمّة الخاصّة و على. مع جيما"
                          : "Notification-3"}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive ? "قد علاقة" : "Notification-4"}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseNotification}
                        className={dropdownItem}
                      >
                        {rtlActive ? "قد فاتّبع" : "Notification-5"}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div> */}
        <div className={managerClasses}>
          <Button
            color="transparent"
            justIcon
            aria-label="Person"
            aria-owns={openUser ? "menu-list" : null}
            aria-haspopup="true"
            onClick={this.handleClickUser}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : ""
            }}
            buttonRef={node => {
              this.anchorEl = node;
            }}
          >
            <Person
              className={
                classes.headerLinksSvg +
                " " +
                (rtlActive
                  ? classes.links + " " + classes.linksRTL
                  : classes.links)
              }
            />
            <Hidden mdUp implementation="css">
              <span onClick={this.handleClickUser} className={classes.linkText}>
                {rtlActive ? "إعلام" : "User"}
              </span>
            </Hidden>
          </Button>
          <Popper
            open={openUser}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !openUser,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleCloseUser}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.profile}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "إجلاء أوزار الأسيوي حين بل, كما"
                          : "My Profile"}
                      </MenuItem>
                      <MenuItem
                        onClick={this.logout}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "شعار إعلان الأرضية قد ذلك"
                          : "Log Out"}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

function mapStateToProps(state) {
  return {
      workingFor: state.user.workingFor,
      workingForId: state.user.workingForId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWorkingForId: Actions.updateWorkingForId
  }, dispatch);
}

export default withStyles(headerLinksStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderLinks)));
