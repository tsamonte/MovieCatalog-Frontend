import React, { Component } from "react";

import Movies from "../services/Movies";
import Billing from "../services/Billing";
import Cookies from "js-cookie";

import "../css/movieDetail.css";

class Detail extends Component {
  state = {
      result: {},
      quantity: "1",
      movie_id: this.props.location.pathname.split("/")[2]
  };

  getMovieDetails = () => {
      const {movie_id} = this.state;

      Movies.get(movie_id)
        .then(response => {
            console.log(response);
            this.setState({result: response["data"]["movie"]});
        })
        .catch(error => console.log(error));
      
  }

  insertIntoCart = () => {
      const {movie_id} = this.state;

      Billing.cartInsert(Cookies.get("email"), movie_id, parseInt(this.state.quantity))
        .then(response => {
            console.log(response);
            response["data"]["resultCode"] === 33  && alert("Please enter a valid quantity (must be a number greater than 0");
            response.data.resultCode === 311 && alert("Item is already in cart");
            response.data.resultCode === 3100 && alert ("Item was successfully inserted into the cart")
        })
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  renderGenres = (genres) => {
      const length = genres.length;
      return genres.map((genre, index) => {
        const {genre_id, name} = genre;
        if(length === index+1) {
            return (
                <label key={genre_id} className="listText" style={{marginLeft: "2px"}}>{name}</label>
            );
        }
        else {
            return (
                <label key={genre_id} className="listText" style={{marginLeft: "2px"}}>{name}, </label>
            );
        }
      })
  }

  renderPeople = (people) => {
      const length = people.length;
      return people.map((person, index) => {
          const {person_id, name} = person;
          if(length === index+1) {
            return (
                <label key={person_id} className="listText" style={{marginLeft: "2px"}}>{name}</label>
            );
        }
        else {
            return (
                <label key={person_id} className="listText" style={{marginLeft: "2px"}}>{name}, </label>
            );
        }
      })
  }

  componentWillMount() {
      this.getMovieDetails();
  }

  render() {
    const { title, year, director, rating, budget, revenue, overview, poster_path, genres, people } = this.state.result; 
    const { quantity } = this.state;
    console.log(genres);
    return (
        <div>
            <div className="titleBar">
                <label className="title">{title + "(" + year + ")"}</label>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <img src={"https://image.tmdb.org/t/p/w300/"+poster_path} alt={title} style={{margin:"0px 10px 10px 10px", border: "solid 2px"}}/>
                <div style={{paddingLeft: "20px"}}>
                        <label className="description">{overview}</label>
                        <label className="sub"><b>Director:</b> {director}</label>
                        <label className="sub"><b>Rating:</b> {rating}</label>
                        {budget !== undefined && <label className="sub"><b>Budget:</b> ${this.numberWithCommas(budget)}</label>}
                        {revenue !== undefined && <label className="sub"><b>Revenue:</b> ${this.numberWithCommas(revenue)}</label>}
                        {genres !== undefined && <label className="sub"><b>Genres:</b> {this.renderGenres(genres)}</label>}
                        {people !== undefined && <label className="sub" style={{flexWrap: "wrap"}}><b>People:</b> {this.renderPeople(people)}</label>}
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "row", margin: "10px 0px 10px 0px"}}>
                <label className="sub"><b>Quantity: </b></label>
                <input 
                    className="smallInput"
                    type="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={this.updateField}
                />
            </div>
            <div>
                <button className="button" onClick={this.insertIntoCart}>Add to cart</button>
            </div>
        </div>
    );
  }
}

export default Detail;