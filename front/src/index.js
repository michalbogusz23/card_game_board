import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top_cards: Array(9).fill(3),
      bot_cards: Array(9).fill(3),
      top_ingame_cards: Array(1).fill(3),
      bot_ingame_cards: Array(1).fill(3),
    };
  }
  render() {
    return (
      <div className="table">
        <Player value={this.state.top_cards}/>
        <Board
          top={this.state.top_ingame_cards}
          bot={this.state.bot_ingame_cards}/>
        <Player value={this.state.bot_cards}/>
      </div>
    )
  }
}
class Player extends React.Component {
  render() {
    const values = this.props.value;

    const cards = values.map((card) =>  {
      return (
        <div>{card}</div>
      )
    });
    return (
      <div className="player">
        <div className="player-cards">
          {cards}
        </div>
        <div className="player-button">
          <button>OK</button>
        </div>
      </div>
      
    )
  }
}
class Board extends React.Component {
  render() {
    const top_player = this.props.top;
    const bottom_player = this.props.bot;

    const top_cards = top_player.map((card) =>  {
      return (
        <div>{card}</div>
      )
    });
    const bottom_cards = bottom_player.map((card) =>  {
      return (
        <div>{card}</div>
      )
    });

    return (
      <div className="board">
        <div className="board-cards">
          <div className="board-card-row">
            {top_cards}
          </div>
          <div className="board-card-row">
            {bottom_cards}
          </div>
        </div>
        <div className="board-result">

        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('root')
);

