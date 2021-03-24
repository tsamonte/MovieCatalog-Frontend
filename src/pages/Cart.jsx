import React, { Component } from "react";
import Billing from "../services/Billing";
import Cookies from "js-cookie";

import CartList from "./children/CartList"

// const localStorage = require("local-storage");

class Cart extends Component {
  state = {
    isEmpty: true,
    items: []
  };

  updateCart = () => {
    console.log("Update cart called");
    Billing.cartRetrieve(Cookies.get("email"))
      .then(response => {
        console.log(response);
        (response["data"]["resultCode"] === 312 && this.setState({isEmpty: true}))
        || (response["data"]["resultCode"] === 3130 && this.setState({isEmpty: false, items: response["data"]["items"]}));
      })
      .catch(error => console.log(error));
  }

  // will be called once before render
  componentWillMount() {
    this.updateCart();
  }

  render() {
    return (
      <div>
        <h1>Cart</h1>
        {this.state.isEmpty && <label style={{marginTop: "20px", fontSize: "20px"}}>Cart is empty</label>}
        {!this.state.isEmpty && <CartList results={this.state.items} updateCart={this.updateCart}/>}
      </div>
    );
  }
}

export default Cart;