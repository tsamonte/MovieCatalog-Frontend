import React, { Component } from "react";

import "../../css/search.css";
import "../../css/common.css";

class SearchResultList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        results: this.props.results
      };
  }

  renderSearch = () => {
      return this.state.results.map((results, index) => {
          const { movie_id, title, year, rating, poster_path } = results;
          return (
            <div className="listItem" key={movie_id}>
                <a href={"/details/"+movie_id}><img src={"https://image.tmdb.org/t/p/w154/"+poster_path} alt={title} style={{margin:"10px", border: "solid 2px"}}/></a>
                <a className="searchTitle" href={"/details/"+movie_id}>{title + " (" + year + ")"}</a>
                <label className="sub"><b>Rating</b>: {rating}</label>
            </div>
          );
      })
  }

  render() {
    return (
        <div className="results">
            {this.renderSearch()}
            {/* <div style={{width: "95vw", display: "flex", justifyContent: "flex-end"}}>
                <button className="button">Next</button>
            </div> */}
        </div>
    );
  }
}

export default SearchResultList;