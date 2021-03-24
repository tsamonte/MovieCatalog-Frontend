import React, { Component } from "react";

import Idm from "../services/Idm";

import "../css/common.css";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { handleLogIn } = this.props;
    const { email, password } = this.state;

    Idm.login(email, password)
      .then(response => {
        console.log(response);
        (response["data"]["resultCode"] === 120 && handleLogIn(email, response["data"]["session_id"]))
        || (response["data"]["resultCode"] === -12 && alert("Please enter a password"))
        || ((response["data"]["resultCode"] === -11 || response["data"]["resultCode"] === -10) && alert("Please enter a valid email address"))
        || (response["data"]["resultCode"] === 11 && alert("Invalid email/password combination"))
        || (response["data"]["resultCode"] === 14 && alert("User not found"));
        response["data"]["resultCode"] === 120 && this.props.history.push("/search");
      })
      .catch(error => console.log(error));
  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={this.updateField}
          ></input>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={this.updateField}
          ></input>
          <center><button className="button">Login</button></center>
          <center><label>Don't have an account? <a style={{color:"blue"}} href="/register">Register</a></label></center>
        </form>
      </div>
    );
  }
}

export default Login;
