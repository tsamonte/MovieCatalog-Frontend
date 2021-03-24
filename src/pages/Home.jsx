import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Welcome to FabFlix</h1>
        <center><h2><a style={{color:"blue"}} href="/login">Login</a></h2></center>
        <center><h2><a style={{color:"blue"}} href="/register">Register</a></h2></center>
      </div>
    );
  }
}

export default Home;
