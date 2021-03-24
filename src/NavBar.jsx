import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

import "./css/style.css";

class NavBar extends Component {
  render() {
    const { handleLogOut, loggedIn } = this.props;

    return (
      <nav className="nav-bar">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        {!loggedIn && (
          <Fragment>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </Fragment>
        )}
        {loggedIn && (
          <Fragment>
            <NavLink className="nav-link" to="/search">
              Search
            </NavLink>
            <NavLink className="nav-link" to="/cart">
              Cart
            </NavLink>
            <NavLink className="nav-link" to="/order_history">
              Order History
            </NavLink>
            <button onClick={handleLogOut} className="nav-button">
              Log Out
            </button>
          </Fragment>
        )}
      </nav>
    );
  }
}

export default NavBar;
