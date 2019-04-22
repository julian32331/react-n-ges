/**
 * Description: Auth style
 * Date: 3/23/2019
 */

import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import authRoutes from "routes/auth.jsx";
import authStyle from "assets/jss/material-dashboard-pro-react/layouts/authStyle.jsx";

class Auth extends React.Component {
  componentDidMount() {
    document.body.style.overflow = "unset";
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <div className={classes.wrapper} ref="wrapper">
          <div
            className={classes.fullPage}
          >
            <Switch>
              {authRoutes.map((prop, key) => {
                if (prop.collapse) {
                  return null;
                }
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                }
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(authStyle)(Auth);
