import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PrivateRoute from './views/examples/PrivateRoute'

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(

  <BrowserRouter>
    <Switch>
      {/* <Route path="/auth/login" render={(props) => <AuthLayout {...props} />} /> */}
      <Route extact path="/auth/login" render={(props) => <AuthLayout {...props} />} />
      <PrivateRoute component={AdminLayout} exact path="/admin/index" />
      <Redirect exact path="/" to="/auth/login" />
      {/* <Redirect component={NotFound} exact path="/" redirect="/auth/login" render={(props) => <AuthLayout {...props} />} /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
