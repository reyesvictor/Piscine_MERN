import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { isAuth, logout } from "../auth/helpers";

const Layout = ({ children, match, history }) => {
  const isActive = path => {
    // console.log(match.path);
    
    if (match.path === path) {
      return { cursor: 'pointer', color: '#000000' };
    } else {
      return { cursor: 'pointer', color: '#ffffff' };
    }
  }

  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive('/')}>Home</Link>
        {/* {JSON.stringify(match)} */}
      </li>
      {/* //if not loggedin, then (&&) */}
      {/* {!isAuth() && */}

      {isAuth() && isAuth().type === true && (
        <li className="nav-item">
          <Link to="/admin" className="nav-link" style={isActive('/admin')}>ADMINS-ONLY</Link>
        </li>
      )}

      {isAuth() ?
        <Fragment>
          <li className="nav-item">
            <Link to={'/' + isAuth().login} className="nav-link" style={isActive(isAuth().login)}>{isAuth().login}</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" style={isActive('/login')}
              onClick={() => {
                logout(() => {
                  history.push('/');
                });
              }}
            >Logout</Link>
          </li>
        </Fragment>
        :
        <Fragment>
          <li className="nav-item">
            <Link to="/login" className="nav-link" style={isActive('/login')}>Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link" style={isActive('/register')}>Register</Link>
          </li>
        </Fragment>
      }
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
