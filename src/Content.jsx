import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Complete from "./pages/Complete";

class Content extends Component {
  render() {
    const { handleLogIn } = this.props;

    return (
      <div className="content">
        <Switch>
          <Route path="/login" component={props => <Login handleLogIn={handleLogIn} {...props} />}/>
          <Route path="/register" component={Register}/>
          <Route path="/search" component={Search}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/order_history" component={OrderHistory}/>
          <Route path="/details" component={Detail}/>
          <Route path="/complete" component={props => <Complete {...props}/>}/>
          <Route path="/movies" component={Movies} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Content;
