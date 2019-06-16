/**
 * Description: Header Links.
 * Date: 3/23/2019
 */

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import store from 'store';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { updateIntl } from 'react-intl-redux'

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
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components
import Button from "components/CustomButtons/Button.jsx";

import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    openUser      : false,
    selectedSalon : Number(this.props.workingForId),
  };

  componentWillReceiveProps(nextProps) {
    let code = nextProps.locale === "sv"? "SE" : "US"
    // this.refs.langFlag.updateSelected(code)

    if(nextProps.workingForId) {
      this.setState({
        selectedSalon: Number(nextProps.workingForId)
      })
    }
  } 
  
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
      [event.target.name]: Number(event.target.value)
    });
    this.props.updateUser({
      workingForId  : Number(event.target.value),
      isEmployee    : companyAuthLevel === "EMPLOYEE"? true : false
    });
  };

  onSelectFlag = (countryCode) => {
    let code;
    if (countryCode === "US") {
      code = "en"
    } else if (countryCode === "SE") {
      code = "sv"
    }
    store.dispatch(
      updateIntl({
        locale: code,
        messages: this.props.locales[code],
      })
    )
  }

  render() {
    const { classes, rtlActive } = this.props;
    const { openUser } = this.state;
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.infoHover,
      { [classes.dropdownItemRTL]: rtlActive }
    );
    // const wrapper = classNames({
    //   [classes.wrapperRTL]: rtlActive
    // });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });

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
      <div className={classes.wrapper}>
        <div className={managerClasses + " " + classes.saloon_select_container}>    
          <FormControl
            fullWidth
            className={classes.selectFormControl + " " + classes.my_0}      
          >
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select + " " + classes.saloon_select
              }}
              value={this.state.selectedSalon}
              onChange={this.handleSaloon}
              inputProps={{
                name: "selectedSalon"
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
          </FormControl>
        </div>
        {/* <ReactFlagsSelect
          ref="langFlag" 
          countries={["SE", "US"]} 
          customLabels={{"SE": "SE", "US": "EN"}}
          defaultCountry="SE"
          alignOptions="left"
          onSelect={this.onSelectFlag}
        /> */}
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
    workingFor    : state.auth.workingFor,
    workingForId  : state.auth.workingForId,
    locales       : state.locales.locales,
    locale        : state.intl.locale
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser: Actions.updateUser
  }, dispatch);
}

export default withStyles(headerLinksStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderLinks)));
