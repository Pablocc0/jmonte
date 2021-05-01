import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { history } from './history';
import NotFound from './views/examples/NotFound';
import PrivateRoute from './views/examples/PrivateRoute'

ReactDOM.render(

  <BrowserRouter history={history}>
    <Switch>
      {/* <Route path="/auth/login" render={(props) => <AuthLayout {...props} />} /> */}
      <Route component={AuthLayout} exact path="/auth/login" />
      <PrivateRoute component={AdminLayout} exact path="/admin/index" />
      <PrivateRoute component={NotFound} exact path="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
