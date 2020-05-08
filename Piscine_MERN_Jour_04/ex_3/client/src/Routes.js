import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Blog from "./core/Blog";
import Admin from "./core/Admin";
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/:login" exact component={Blog} />
        <AdminRoute path="/admin" exact component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
