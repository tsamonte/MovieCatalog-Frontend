import React, { Component } from "react";

import Billing from "../services/Billing";

class Complete extends Component {
  state = {};

  // ?token=8RU23338KX440781T&PayerID=BT8RW4HJZFR54
  orderComplete = () => {
      const search = this.props.location.search;
      const token = search.split("=")[1].split("&")[0];
      const payerID = search.split("=")[2];

      console.log("Token: " + token + "\nPayerID: " + payerID);
      const params = {
          token: token,
          payer_id: payerID
      }

      Billing.orderComplete(params)
        .catch(error => console.log(error));
  }

  componentWillMount() {
      this.orderComplete();
  }

  render() {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <h1>Your Order is Complete!</h1>
            <a href="/search" style={{margin: "10px 20px 0px 100px", color: "blue"}}>Return to search page</a>
        </div>
    );
  }
}

export default Complete;