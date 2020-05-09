import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Register from './auth/Register';
import Login from './auth/Login';
import Blog from './core/Blog';
import BlogEdit from './core/BlogEdit';
import BlogDetails from './core/BlogDetails';
import Admin from './core/Admin';
import AdminRoute from './auth/AdminRoute';
import PrivateRoute from './auth/PrivateRoute';
import LoginRoute from './auth/LoginRoute';
import { Provider } from 'react-redux'
import store from './store'

const Routes = () => {
  return (
    // <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={App} />
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <PrivateRoute path='/:login' exact component={Blog} />
          <PrivateRoute path='/:user_id/:_id/edit' component={BlogEdit} />
          <PrivateRoute path='/:user_id/:_id/' component={BlogDetails} />
          <AdminRoute path='/admin' exact component={Admin} />
        </Switch>
      </BrowserRouter>
    // </Provider>
  );
};

export default Routes;
