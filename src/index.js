import React from "react";
import ReactDOM from "react-dom";
import { addLocaleData } from "react-intl";
import { IntlProvider } from "react-intl-redux";
import itLocaleData from 'react-intl/locale-data/it'
import zhLocaleData from 'react-intl/locale-data/zh'
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import {Provider} from 'react-redux';
import store from 'store';

import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";

addLocaleData([...itLocaleData, ...zhLocaleData]);

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </Router>
    </IntlProvider>
  </Provider>,  
  document.getElementById("root")
);
