import React, { Component } from "react";

import "../../css/history.css";
import "../../css/common.css";

class HistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results
        };
    }


    toAmericanDate = (date) => {
        const ymd = date.split("-");
        return ymd[1] + "/" + ymd[2] + "/" + ymd[0];
    }

    renderHistory = () => {
        return this.state.results.map((result, index) => {
            const {capture_id, amount, create_time} = result;
            const {total} = amount;
            const date = create_time.split("T")[0];
            return (
                <div className="historyEntry" key={capture_id}>
                    <label className="historyText">Date: {this.toAmericanDate(date)}</label>
                    <label className="historyText">Total: ${total}</label>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="historyList">
                {this.renderHistory()}
            </div>
        )
    }
}

export default HistoryList;