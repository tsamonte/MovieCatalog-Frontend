import React, { Component } from "react";

import Idm from "../services/Idm";

import "../css/common.css";

class Register extends Component {
    state = {
      email: "",
      password: ""
    };

    handleSubmit = e => {
      e.preventDefault();

      const {email, password} = this.state;

      Idm.register(email, password)
        .then(response => {
          console.log(response);
          response["data"]["resultCode"] === 110 && alert("User registered successfully");
          response["data"]["resultCode"] === 110 && this.props.history.push("/login");
          response["data"]["resultCode"] === -12 && alert("Please enter a password");
          (response["data"]["resultCode"] === -11 || response["data"]["resultCode"] === -10) && alert("Please enter a valid email address");
          (response["data"]["resultCode"] === 12 || response["data"]["resultCode"] === 13) && alert("Please enter a valid password: must be at least 7 alphanumeric characters long and no more than 16 characters; must contain at least one uppercase letter, one lowercase letter, and one number");
          response["data"]["resultCode"] === 16 && alert("A user with that email is already registered");
        })
        .catch(error => console.log(error));
    };

    updateField = e => {
      const {name, value} = e.target;
    
      this.setState({[name]: value});
      };

    render() {
      const {email, password} = this.state;

      return (
        <div>
          <h1>Register</h1>
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
          <center><button className="button">Register</button></center>
          <center><label>Already have an account? <a style={{color:"blue"}} href="/login">Login</a></label></center>
        </form>
        </div>
      )
    }
}

export default Register;