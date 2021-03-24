import React, { Component } from "react";
import Cookies from "js-cookie";

import Billing from "../services/Billing";

import HistoryList from "./children/HistoryList";

class OrderHistory extends Component {
  state = {
    results: {},
    hasOrderHistory: false
  };

  orderRetrieve = () => {
    Billing.orderRetrieve(Cookies.get("email"))
      .then(response => {
        response["data"]["resultCode"] === 3410 && this.setState({results: response["data"]["transactions"], hasOrderHistory: true});
        response["data"]["resultCode"] === 313 && this.setState({hasOrderHistory: false});
      })
      .catch(error => console.log(error));
  }

  componentWillMount() {
    this.orderRetrieve();
  }

  render() {
    return(
      <div>
        <h1>Order History</h1>
        {!this.state.hasOrderHistory && <label style={{marginTop: "20px", fontSize: "20px"}}>No order history</label>}
        {this.state.hasOrderHistory && <HistoryList results={this.state.results}/>}
      </div>
    );
  }
}

export default OrderHistory;