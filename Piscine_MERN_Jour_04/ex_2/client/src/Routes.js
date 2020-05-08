import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Private from "./core/Private";
import PrivateRoute from './auth/PrivateRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/private" exact component={Private} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
