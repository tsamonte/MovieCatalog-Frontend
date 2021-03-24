import React, { Component } from "react";
import Cookies from "js-cookie";


import "../../css/cart.css";
import "../../css/common.css";

import Billing from "../../services/Billing";

class CartList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: this.props.results,
            totalPrice: 0,
            totalMovies: 0,
            newQuantity: "0"
        };
    }
    
    checkout = () => {
        console.log("Checkout initiated");
        Billing.orderPlace(Cookies.get("email"))
            .then(response => {
                console.log(response);
                response["data"]["resultCode"] === 3400 && window.location.replace(response["data"]["approve_url"]);
            })
    }

    handleUpdateButton = (movie_id, updateQuantity) => {
        console.log("Update initiated:\n\tmovie_id: " + movie_id + "\n\tnew quantity: " + updateQuantity);
        Billing.cartUpdate(Cookies.get("email"), movie_id, parseInt(updateQuantity))
            .then(response => {
                response["data"]["resultCode"] === 3110 && alert("Quantity updated");
                response["data"]["resultCode"] === 3110 && this.props.updateCart();
                response["data"]["resultCode"] === 3110 && window.location.reload(false);
                response["data"]["resultCode"] === 33 && alert("Please enter a valid quantity (must be greater than 0)");
                this.setState({newQuantity: "0"});
            })
            .catch(error => console.log(error));
    }
    
    handleDeleteButton = (movie_id) => {
        console.log("Delete initiated:\n\tmovie_id: " + movie_id);
        Billing.cartDelete(Cookies.get("email"), movie_id)
            .then(response => {
                response["data"]["resultCode"] === 3120 && alert("Item removed from cart");
                response["data"]["resultCode"] === 3120 && this.props.updateCart();
                response["data"]["resultCode"] === 3120 && window.location.reload(false);
            })
            .catch(error => console.log(error));
    }

    handleClearButton = () => {
        console.log("Clear initiated");
        Billing.cartClear(Cookies.get("email"))
            .then(response => {
                response["data"]["resultCode"] === 3140 && alert("Shopping cart cleaed");
                response["data"]["resultCode"] === 3140 && window.location.reload(false);
            })
    }

    updateInput = e => {
        const {name, value} = e.target;

        this.setState({[name]: value});
    }

    renderCart = () => {
        return this.state.results.map((results, index) => {
            const {movie_id, unit_price, quantity, movie_title, poster_path} = results;
            const {newQuantity} = this.state;
            // this.setState({totalMovies: this.state.totalMovies+quantity, totalPrice: this.state.totalPrice+(unit_price*quantity)});
            return (
                <div className="cartEntry" key={movie_id}>
                    <a href={"/details/"+movie_id}><img src={"https://image.tmdb.org/t/p/w154/" + poster_path} alt={movie_title} style={{margin:"10px", border: "solid 2px"}} /></a>
                    <div className="cartList">
                        <a className="cartTitle" href={"/details/"+movie_id}>{movie_title}</a>
                        <label className="sub"><b>Unit price</b>: ${unit_price}</label>
                        <label className="sub"><b>Quantity</b>: {quantity}</label>
                        <label className="sub"><b>Total Price</b>: ${(unit_price * quantity).toFixed(2)}</label>
                    </div>
                    <div style={{margin: "30px"}}>
                        <label style={{fontWeight: "bold"}}><b>Update quantity</b>: </label>
                        <input type="text" className="smallInput" name="newQuantity" value={newQuantity} onChange={this.updateInput}/>
                        <button className="cartButton" onClick={() => this.handleUpdateButton(movie_id, newQuantity)}>Update</button>
                        <button className="cartButton" style={{marginTop: "20px"}} onClick={() => this.handleDeleteButton(movie_id)}>Remove</button>
                    </div>
                    <div style={{margin: "30px"}}>
                        
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="cartList">
                {this.renderCart()}
                {/* <label>Total Price: ${this.state.totalPrice}</label>
                <label>Total Quantity: ${this.state.totalMovies}</label> */}
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "95vw"}}>
                    <button className="button" style={{display: "flex", alignSelf: "flex-start"}} onClick={this.checkout}>Checkout</button>
                    <button className="button" style={{display: "flex", alignSelf: "flex-end", backgroundColor: "lightslategrey"}} onClick={this.handleClearButton}>Clear</button>
                </div>
            </div>
        );
    }
}

export default CartList;