import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'

const Layout = ({ children, match }) => {
  const isActive = path => {
    if (match.path == path) {
      return { color: '#000000' };
    } else {
      return { color: '#ffffff' };
    }
  }
  
  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive('/')}>Home</Link>
    {/* {JSON.stringify(match)} */}
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link" style={isActive('/login')}>Login</Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link" style={isActive('/register')}>Register</Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
