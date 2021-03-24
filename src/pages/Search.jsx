import React, { Component } from "react";
import Movies from "../services/Movies";

import "../css/common.css";
import "../css/form.css";

import SearchResultList from "./children/SearchResultList";

class Search extends Component {
  state = {
    search: "",
    searchBy: "title", // can be title or keyword
    limit: "10", // can be 10, 25 50, or 100
    offset: "0", // can be 0 or positive multiple of the limit
    page: 1, 
    year: "",
    director: "",
    genre: "",
    orderby: "title", // can be title, rating, or year
    direction: "asc", // can be asc or desc
    results: [],
    resultsFound: false
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Search was submitted:" +
                "\n\tquery: " + this.state.search +
                "\n\tsearchBy: " + this.state.searchBy +
                "\n\tlimit: " + this.state.limit +
                "\n\toffset: " + this.state.offset +
                "\n\tyear: " + this.state.year +
                "\n\tdirector: " + this.state.director +
                "\n\tgenre: " + this.state.genre +
                "\n\torderby: " + this.state.orderby +
                "\n\tdirection: " + this.state.direction);

    this.state.searchBy === "title" && this.search();
    this.state.searchBy === "keyword" && this.browse();
  }

  // will be called if searching by title
  search = () => {
    console.log("Search initiated");
    const params = {
      title: this.state.search === "" ? null : this.state.search,
      year: this.state.year === "" ? null : parseInt(this.state.year),
      director: this.state.director === "" ? null : this.state.director,
      genre: this.state.genre === "" ? null : this.state.genre,
      limit: parseInt(this.state.limit),
      offset: this.state.offset === "" ? null : parseInt(this.state.offset),
      orderby: this.state.orderby,
      direction: this.state.direction
    };

    Movies.search(params)
      .then(response => {
        // set results to data.movies
        this.state.resultsFound === true && this.setState({resultsFound: false});
        response["data"]["resultCode"] === 210 && this.setState({results: response["data"]["movies"], resultsFound: true});
        response["data"]["resultCode"] === 211 && this.setState({resultsFound:true});
      })
      .catch(error => console.log(error));
  }

  // will be called if searching by keyword
  browse = () => {
    console.log("Browse initiated");
    const params = {
      limit: parseInt(this.state.limit),
      offset: this.state.offset === "" ? null : parseInt(this.state.offset),
      orderby: this.state.orderby,
      direction: this.state.direction
    };

    Movies.browse(this.state.search, params)
      .then(response => {
        this.state.resultsFound === true && this.setState({resultsFound: false});
        response["data"]["resultCode"] === 210 && this.setState({results: response["data"]["movies"], resultsFound: true});
        response["data"]["resultCode"] === 211 && this.setState({resultsFound:true});
      })
      .catch(error => console.log(error));
  }

  updateField = e => {
    const {name, value} = e.target;

    this.setState({[name]: value});
  };

  render() {
    const { search, offset, year, director, genre } = this.state;

    return (
      <div>
        <div className="form-box">
          <form onSubmit={this.handleSubmit}>
            <h1>Search for a movie:</h1>
            <input 
              className="input"
              type="search"
              name="search"
              value={search}
              onChange={this.updateField}
            />
            
            <div className="radioButtonContainer">
              <label style={{fontWeight: "bold"}}>Search by:</label>
              <label className="radioButton">
                <input 
                  type="radio"
                  name="searchBy"
                  value="title"
                  checked={this.state.searchBy === "title"}
                  onChange={this.updateField}
                />
                Title
              </label>
              <label className="radioButton">
                <input 
                  type="radio"
                  name="searchBy"
                  value="keyword"
                  checked={this.state.searchBy === "keyword"}
                  onChange={this.updateField}
                />
                Keyword
              </label>
            </div>

            <div className="radioButtonContainer">
              <label style={{fontWeight: "bold"}}>Limit:</label>
              <label className="radioButton">
                <input 
                  type="radio"
                  name="limit"
                  value="10"
                  checked={this.state.limit === "10"}
                  onChange={this.updateField}
                />
                10
              </label>
              <label className="radioButton">
                <input 
                  type="radio"
                  name="limit"
                  value="25"
                  checked={this.state.limit === "25"}
                  onChange={this.updateField}
                />
                25
              </label>
              <label className="radioButton">
                <input 
                  type="radio"
                  name="limit"
                  value="50"
                  checked={this.state.limit === "50"}
                  onChange={this.updateField}
                />
                50
              </label>
              <label className="radioButton">
                <input 
                  type="radio"
                  name="limit"
                  value="100"
                  checked={this.state.limit === "100"}
                  onChange={this.updateField}
                />
                100
              </label>
              <label style={{fontWeight: "bold", paddingLeft: "7px", paddingRight: "7px"}}>Offset: </label>
              <input className="smallInput" type="offset" name="offset" value={offset} onChange={this.updateField}/>
            </div>
            <div className="radioButtonContainer">
              <label style={{fontWeight: "bold", paddingRight: "7px"}}>Year: </label>
              <input className="smallInput" type="year" name="year" value={year} onChange={this.updateField}/>

              <label style={{fontWeight: "bold", paddingLeft: "7px", paddingRight: "7px"}}>Director: </label>
              <input className="smallInput" type="director" name="director" value={director} onChange={this.updateField}/>

              <label style={{fontWeight: "bold", paddingLeft: "7px", paddingRight: "7px"}}>Genre: </label>
              <input className="smallInput" type="genre" name="genre" value={genre} onChange={this.updateField}/>
            </div>
            <div className="radioButtonContainer">
              <label style={{fontWeight: "bold"}}>Sort by:</label>
              <label className="radioButton">
                <input
                  type="radio"
                  name="orderby"
                  value="title"
                  checked={this.state.orderby === "title"}
                  onChange={this.updateField}
                />
                Title
              </label>

              <label className="radioButton">
                <input
                  type="radio"
                  name="orderby"
                  value="year"
                  checked={this.state.orderby === "year"}
                  onChange={this.updateField}
                />
                Year
              </label>

              <label className="radioButton">
                <input
                  type="radio"
                  name="orderby"
                  value="rating"
                  checked={this.state.orderby === "rating"}
                  onChange={this.updateField}
                />
                Rating
              </label>

              <label style={{fontWeight: "bold", paddingLeft: "21px", paddingRight: "7px"}}>Direction:</label>
              <label className="radioButton">
                <input
                  type="radio"
                  name="direction"
                  value="asc"
                  checked={this.state.direction === "asc"}
                  onChange={this.updateField}
                />
                ASC
              </label>
              <label className="radioButton">
                <input
                  type="radio"
                  name="direction"
                  value="desc"
                  checked={this.state.direction === "desc"}
                  onChange={this.updateField}
                />
                DESC
              </label>
            </div>
            <div>
              <button className="button">Search</button>
            </div>
          </form>
        </div>
        <div>
          {this.state.resultsFound && this.state.results.length === 0 && <label>No movies found</label>}
          {this.state.resultsFound && this.state.results.length !== 0 && <SearchResultList style={{margin: "20px"}} results={this.state.results}/>}
        </div>
      </div>
    );
  }
}

export default Search;