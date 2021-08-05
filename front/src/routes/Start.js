import React from "react";
import "./war.css";
import {Link} from "react-router-dom";


export default class Start extends React.Component {


    render() {
        return (
            <div>
                <StartScreen/>
            </div>
        )
    }
}


class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    render() {
        return <div className="center-screen">
            <div className="center-screen-row">
                <input type="text"
                       name="name"
                       placeholder="GAME CODE"
                       value={this.state.value}
                       onChange={e => this.handleChange(e)}
                />
                <Link to="/makao">ENTER GAME</Link>
            </div>
            <div className="center-screen-row">
                <button className="btn-create-game">Create new game</button>
            </div>
        </div>;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
}

class GamesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: ["makao", "war"]
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
    }